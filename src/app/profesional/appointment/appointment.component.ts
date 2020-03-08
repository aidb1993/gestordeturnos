import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Appointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  constructor(private appointmentService: AppointmentService, private datePipe: DatePipe,
              public login: LoginService
              ) { }
  appointments: Array<Appointment> = [];
  loaded = true;
  firstLoaded = true;
  dateForm = new FormGroup({
    date: new FormControl('')
  });
  dateQ = {
    date: ''
  };
  sessionData: any;
  ngOnInit(): void {
    this.login.user$.subscribe(res => {
      this.sessionData = res;
      console.log(this.sessionData);
      this.appointmentService.setProf(this.sessionData.profId);
    });
  }
  getAppointments() {
    this.appointmentService.getUserApp(this.sessionData.profId).subscribe(appointments => {
      this.appointments = appointments;
      this.firstLoaded = false;
      console.log(this.appointments);
    });
  }

  getDay(date) {
    this.appointmentService.getDay(date).subscribe(appointments => {
      this.appointments = appointments;
      this.firstLoaded = false;
    });
  }

  deleteAppointment(event, appointment: Appointment): void {
    this.appointmentService.deleteAppointment(appointment);
  }

  onSubmit() {
    this.dateQ = this.dateForm.value;
    this.getDay(this.datePipe.transform(this.dateQ.date, 'dd/MM'));
  }
}


