import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Rooms } from '../models/rooms.model';
import { Room } from '../models/room.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private db: AngularFirestore) {
  }
  getAllRooms(): Observable<any>{
    return this.db.collection('Room', ref=> ref.orderBy('number','asc')).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getAvailableRooms(): Observable<any>{
    return this.db.collection('Room', ref=> ref.orderBy('number','asc').where('ifBooked','==',false)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }

  getBookedRooms(): Observable<any>{
    return this.db.collection('Room', ref=> ref.orderBy('number','asc').where('ifBooked','==',true)).snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
  }
}
