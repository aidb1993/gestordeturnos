import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment } from '../models/appointment.model';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentsCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<any[]>;
  appointmentsDoc: AngularFirestoreDocument<Appointment>;

  constructor(public afs: AngularFirestore) {

  }
  getAppointments() {
    this.appointmentsCollection = this.afs.collection('Appointments', ref => ref.orderBy('date', 'asc').orderBy('time', 'asc'));
    this.appointments = this.appointmentsCollection.snapshotChanges().pipe(
      map( changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Appointment;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.appointments;
  }
  createAppointment(appointment: Appointment) {
    this.appointmentsCollection = this.afs.collection('Appointments', ref => ref.orderBy('date', 'asc').orderBy('time', 'asc'));
    this.appointmentsCollection.add(appointment).then(r => console.log(r));
  }
  deleteAppointment(appointment: Appointment): void {
    this.appointmentsDoc = this.afs.doc(`Appointments/${appointment.id}`);
    this.appointmentsDoc.delete().then(r => console.log(r));
  }
  getDay(date: string): any {
    this.appointmentsCollection = this.afs.collection('Appointments', ref => ref.where('date', '==', date));
    this.appointments = this.appointmentsCollection.snapshotChanges().pipe(
      map( changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Appointment;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.appointments;
  }
}


