import { Component, OnInit } from '@angular/core';
import { RoomsService } from 'src/app/core/_services/rooms.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-available-rooms',
  templateUrl: './available-rooms.component.html',
  styleUrls: ['./available-rooms.component.scss']
})
export class AvailableRoomsComponent implements OnInit {

 

  rooms$: Observable<any>;
  roomsSubscription: Subscription;
  rooms = []

  constructor(private roomsService: RoomsService, private router: Router ) {
  }
  
  ngOnInit() {
    this.rooms$ = this.roomsService.getAvailableRooms()
    this.roomsSubscription = this.rooms$.subscribe(res=>{
      this.rooms = res;
      // console.log(this.rooms);
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
