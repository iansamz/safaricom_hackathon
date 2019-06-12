import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private db: AngularFirestore) { }

  bookRoom(booking){
    this.db.collection('Bookings').add(booking)
  }

  getBookings(){
    return this.db.collection('Bookings').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getBookingsPerRoom(id){
    return this.db.collection('Room').doc(id).collection('Bookings').snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
  
  // ifBookedNow(){
  //   return this.db.collection()
  // }

  getTotal(){
    return this.db.collection("Total").doc("total").valueChanges();
  }
}
