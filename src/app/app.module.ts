import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';


import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AuthService } from './core/_services/auth.service';
import { AngularFireAuthModule, } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BookingService } from './core/_services/booking.service';
import { RoomsService } from './core/_services/rooms.service';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent
  ],
  providers: [AuthService,BookingService,RoomsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
