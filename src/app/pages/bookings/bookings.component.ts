import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { BookingService } from 'src/app/core/_services/booking.service';


@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
 
  booking$: Observable<any>;
  bookingSubscription: Subscription;
  bookings


  total$: Observable<any>;
  totalSubscription: Subscription;
  total: number;

  constructor(private db: AngularFirestore, private bookingService: BookingService ) { }

  ngOnInit() {
    this.booking$ = this.bookingService.getBookings()
    this.bookingSubscription = this.booking$.subscribe(res=>{
      this.bookings = res;
      // console.log(this.rooms);
    })

    this.total$ = this.bookingService.getTotal()
    this.totalSubscription = this.total$.subscribe(res=>{
      this.total = res.total || 0;
      // console.log(this.rooms);
    })
  }
  cancelBooking(booking){
    let newTotal = 0;
    newTotal = this.total - booking.price;
    this.db.collection('Room').doc(booking.roomId).update( { ifBooked: false } ).then(res=>{
      this.db.collection('Room').doc(booking.roomId).collection("Bookings").doc(booking.id).delete()
      this.db.collection('Total').doc('total').update({ total: newTotal })
      this.db.collection('Bookings').doc(booking.id).delete();
    })
  }
}
