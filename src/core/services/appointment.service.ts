import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Appointment, UserAppointment } from '../models/appointment.model';
import { Profesional } from '../models/profesional.model';
@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  appointmentsCollection: AngularFirestoreCollection<Appointment>;
  appointments: Observable<any[]>;
  appointmentsDoc: AngularFirestoreDocument<Appointment>;
  app: Observable<any>;
  profId: string;
  profInfo: Observable<Profesional>

  constructor(public afs: AngularFirestore) {

  }
  setProf(id: string) {
    this.profId = id;
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
    this.appointmentsCollection = this.afs.collection('profesionals').doc(`${appointment.uid}`).collection('appointments');
    const user = this.afs.collection('users').doc(`${appointment.userid}`).collection('appointments');
    this.appointmentsCollection.add(appointment).then(r => console.log(r));
    user.add(appointment).then(r => console.log(r));
  }
  deleteAppointment(appointment: Appointment) {
    this.appointmentsDoc = this.afs.collection('profesionals/').doc(`${appointment.uid}`).collection('appointments').doc(`${appointment.id}`)
    this.appointmentsDoc.delete().then(r => console.log(r));
  }
  getDay(date: string): any {
    const query = ref => ref.where('date', '==', date);
    this.appointmentsCollection = this.afs.collection('profesionals/').doc(`${this.profId}`).collection('appointments', query);
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

  getUserApp(profId: string) {
    const query = ref => ref.orderBy('date', 'asc').orderBy('time', 'asc');
    const collection = this.afs.collection('profesionals/').doc(`${profId}`).collection('appointments', query);
    this.app = collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as Appointment;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
    return this.app;
  }

  getClientApp(uId: string) {
    const query = ref => ref.orderBy('date', 'asc').orderBy('time', 'asc');
    const collection = this.afs.collection('users/').doc(`${uId}`).collection('appointments', query);
    this.app = collection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as UserAppointment;
          data.id = a.payload.doc.id;
          this.getProfInfo(data.uid).subscribe(res => {
            data.profesional = res;
          });
          return data;
        });
      })
    );
    return this.app;
  }

  getProfInfo(profId: string): Observable<Profesional> {
    const collection = this.afs.collection('profesionals/').doc(`${profId}`);
    this.profInfo = collection.snapshotChanges().pipe(
      map(changes => {
        return changes.payload.data() as Profesional;
      })
    );
    return this.profInfo;
  }
}


