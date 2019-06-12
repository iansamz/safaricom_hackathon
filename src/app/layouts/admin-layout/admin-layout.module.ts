import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BookingsComponent } from '../../pages/bookings/bookings.component';
import { RoomsComponent } from '../../pages/rooms/rooms.component';
import { AvailableRoomsComponent } from '../../pages/available-rooms/available-rooms.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { RoomsService } from 'src/app/core/_services/rooms.service';
import { BookingService } from 'src/app/core/_services/booking.service';
import { BookRoomComponent } from '../../pages/book-room/book-room.component';
import { BookedRoomsComponent } from '../../pages/booked-rooms/booked-rooms.component';
import { RoomBookingsComponent } from '../../pages/room-bookings/room-bookings.component';
import { CancelBookingComponent } from '../../pages/cancel-booking/cancel-booking.component';
// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    ComponentsModule,
    ReactiveFormsModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    BookingsComponent,
    RoomsComponent,
    AvailableRoomsComponent,
    BookRoomComponent,
    BookedRoomsComponent,
    RoomBookingsComponent,
    CancelBookingComponent,
  ],
  providers:[
    RoomsService,
    BookingService
  ]
})

export class AdminLayoutModule {}
