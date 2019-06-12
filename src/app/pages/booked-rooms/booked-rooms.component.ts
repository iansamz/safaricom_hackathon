import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/core/_services/rooms.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-booked-rooms',
  templateUrl: './booked-rooms.component.html',
  styleUrls: ['./booked-rooms.component.scss']
})
export class BookedRoomsComponent implements OnInit {


 

  rooms$: Observable<any>;
  roomsSubscription: Subscription;
  rooms = []

  constructor(private roomsService: RoomsService, private router: Router , private db: AngularFirestore) {
  }
  
  ngOnInit() {
    this.rooms$ = this.roomsService.getBookedRooms()
    this.roomsSubscription = this.rooms$.subscribe(res=>{
      this.rooms = res;
      console.log(this.rooms);
    })
  }

  ngOnDestroy(){
    
  }
  
  viewBookings(id){
    console.log(id)
    this.router.navigateByUrl(`/view-bookings/${id}`);
  }

  bookRoom(id){
    console.log(id)
    this.router.navigateByUrl(`/book-room/${id}`);
  }

}
