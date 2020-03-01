import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AppointmentService } from '../core/services/appointment.service';
import 'firebase/firestore';
import { RouterModule, Routes } from '@angular/router';

import {environment} from '../environments/environment';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentComponent } from './appointment/appointment.component';
import { BookComponent } from './book/book.component';
import { LandingComponent } from './landing/landing.component';
import { ServiceWorkerModule } from '@angular/service-worker';

const appRoutes: Routes = [
  {
    path: 'book',
    component: BookComponent
  },
  {
    path: 'landing',
    component: LandingComponent
  },
  {
    path: '' ,
    redirectTo: '/landing',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AppointmentComponent
  },
  {
    path: 'landing/book',
    redirectTo: 'book'
  },
  {
    path: 'landing/admin',
    redirectTo: 'admin'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    BookComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'appointmentmanager'),
    AngularFirestoreModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes
    ),
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgxMaterialTimepickerModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [AppointmentService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
