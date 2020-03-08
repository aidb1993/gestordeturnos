import { DatePipe } from '@angular/common';
import { AngularFireModule } from '@angular/fire';
import { canActivate } from '@angular/fire/auth-guard';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { AppointmentService } from '../core/services/appointment.service';
import 'firebase/firestore';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/services/auth.guard';

import {environment} from '../environments/environment';
import { AdminComponent } from './admin/admin.component';
import { AdminModule } from './admin/admin.module';

import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AppointmentComponent } from './appointment/appointment.component';
import { BookComponent } from './client/book/book.component';
import { LandingComponent } from './landing/landing.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { LandingModule } from './landing/landing.module';
import { MainComponent } from './client/main/main.component';
import { ClientAppointmentsComponent } from './client/client-appointments/client-appointments.component';
import { BackButtonComponent } from './components/back-button/back-button.component';

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
    component: AppointmentComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'landing/book',
    redirectTo: 'book'
  },
  {
    path: 'landing/admin',
    redirectTo: 'admin'
  },
  {
    path: 'super',
    component: AdminComponent
  },
  {
    path: 'landing/super',
    redirectTo: 'super'
  },
  {
    path: 'client',
    component: MainComponent
  },
  {
    path: 'client/apps',
    component: ClientAppointmentsComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AppointmentComponent,
    BookComponent,
    LandingComponent,
    MainComponent,
    ClientAppointmentsComponent,
    BackButtonComponent,
  ],
  imports: [
    BrowserModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase, 'appointmentmanager'),
    AngularFirestoreModule.enablePersistence(),
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
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    LandingModule,
    AdminModule,
    MatSelectModule
  ],
  providers: [AppointmentService, DatePipe, AuthGuard, MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
