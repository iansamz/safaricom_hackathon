import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { RoomsComponent } from '../../pages/rooms/rooms.component';
import { AvailableRoomsComponent } from '../../pages/available-rooms/available-rooms.component';
import { BookingsComponent } from '../../pages/bookings/bookings.component';
import { BookRoomComponent } from '../../pages/book-room/book-room.component';
import { CancelBookingComponent } from 'src/app/pages/cancel-booking/cancel-booking.component';
import { BookedRoomsComponent } from 'src/app/pages/booked-rooms/booked-rooms.component';
import { RoomBookingsComponent } from 'src/app/pages/room-bookings/room-bookings.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'rooms',         component: RoomsComponent },
    { path: 'available-rooms', component: AvailableRoomsComponent },
    { path: 'bookings',        component: BookingsComponent },
    { path: 'book-room/:id', component: BookRoomComponent },
    { path: 'view-bookings/:id', component: RoomBookingsComponent },
    { path: 'cancel-booking/:id', component: CancelBookingComponent },
    { path: 'booked-rooms', component: BookedRoomsComponent },
    { path: 'view-bookings/:id', component: RoomBookingsComponent },

];
