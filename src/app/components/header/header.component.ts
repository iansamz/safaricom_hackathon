import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BookingService } from 'src/app/core/_services/booking.service';
import { RoomsService } from 'src/app/core/_services/rooms.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  total = 0
  rooms_available = 0;
  rooms_booked = 0;
  clients = 0;
  constructor(private db: AngularFirestore, private bookingService: BookingService, private roomsService: RoomsService) { }

  ngOnInit() {
    this.roomsService.getBookedRooms().subscribe(res=>{
      this.rooms_booked = res.length;
      this.rooms_available = 100 - this.rooms_booked;
      this.clients = this.rooms_booked;
    })

    this.bookingService.getTotal().subscribe((res:any)=>{
      if(res){
        this.total = res.total;
        console.log(this.total)
      }
    })

  }

}
