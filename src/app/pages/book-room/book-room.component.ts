import { Component, OnInit } from '@angular/core';
import { BookingService } from 'src/app/core/_services/booking.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Room } from 'src/app/core/models/room.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {

  room$: Observable<any>;
  roomSubscription: Subscription;
  room: Room;
  
  total$: Observable<any>;
  totalSubscription: Subscription;
  total: number;

  bookings$: Observable<any>;
  bookingsSubscription: Subscription;
  bookings
  
  roomId : string;
  ifForm : boolean = false;
  err = '';
  ifBooked: boolean;

  bookingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private db: AngularFirestore,
    private router: Router
  ) { }

  ngOnInit() {
    
    this.roomId = this.route.snapshot.paramMap.get("id");
    this.room$ = this.db.collection('Room').doc(this.roomId).valueChanges();
    this.roomSubscription = this.room$.subscribe(res=>{
      this.room = res;
      this.ifForm = true;
    })

    this.total$ = this.db.collection('Total').valueChanges();
    this.totalSubscription = this.total$.subscribe(res=>{
      
        this.total = res.total || 0;
        console.log(this.total)
    })
    
    this.bookings$ = this.bookingService.getBookingsPerRoom(this.roomId)
    this.bookingsSubscription = this.bookings$.subscribe(res=>{
      this.bookings = res;
    })

    this.bookingForm = this.fb.group({
      check_in_date : ['',Validators.required],
      check_out_date : ['',Validators.required],
      client_name : ['',Validators.required],
      client_huduma_number : ['',Validators.required],
      client_gender : ['',Validators.required],
      client_disability : ['',Validators.required],
    });
    
    
    
  }

  addBooking(){
    //Check if check out date is greater check in date
    if(Date.parse(this.bookingForm.value.check_in_date) < Date.parse(this.bookingForm.value.check_out_date)){
      //start is less than End
      
      //set value to check array of bookings on room 
      this.ifBooked = false;

      for(let i=0; i<this.bookings.length;i++){

        if(
          //if checkin date is between the bookings checkout
          (Date.parse(this.bookingForm.value.check_in_date) > Date.parse(this.bookings[i].check_in_date) && 
          (Date.parse(this.bookingForm.value.check_in_date) < Date.parse(this.bookings[i].check_out_date)

        ))){
          this.ifBooked = true;
          console.log(this.ifBooked)
        }
        if(
          //if chekout date is between the bookings checkout
          (Date.parse(this.bookingForm.value.check_out_date) > Date.parse(this.bookings[i].check_in_date) && 
          (Date.parse(this.bookingForm.value.check_out_date) < Date.parse(this.bookings[i].check_out_date)

        ))){
          this.ifBooked = true;
          console.log(this.ifBooked)
        }
      }
      
      if(!this.ifBooked){

        this.err = "";
        this.db.collection('Room').doc(this.roomId).collection('Bookings').add(this.bookingForm.value)
        .then((res)=>{
          this.db.collection('Room').doc(this.roomId).update({ifBooked:true})
          .then(resI=>{

            let newTotal = 0;
            let price = this.room.price
            if(this.bookingForm.value.client_disability){
              price = price * 0.4;
            } 
            console.log(price)
            newTotal = this.total + price
            console.log(newTotal)

            this.db.collection('Bookings').doc(res.id).set({...this.bookingForm.value,roomId: this.roomId,roomNumber: this.room.number, price: price, type: this.room.type});
            this.db.collection('Total').doc('total').set({total: newTotal})
            this.router.navigateByUrl('/bookings')
          })
        })
      }else{
        this.err = "Room booked for the period selected"
      }

    }else{
        //end is less than start
        this.err = "Check Out Date Cant Be Later than Check In Date"
    }
  }

}
