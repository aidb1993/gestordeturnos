import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Appointment } from '../../../core/models/appointment.model';
import { Profesional } from '../../../core/models/profesional.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.scss']
})
export class BookComponent implements OnInit {

  constructor(private appointmentService: AppointmentService,
              private datePipe: DatePipe,
              private loginService: LoginService
  ) { }

  newAppointmentForm = new FormGroup({
    date : new FormControl('', [Validators.required]),
    time : new FormControl('', [Validators.required]),
    user : new FormControl('', [Validators.required]),
    comment: new FormControl('')
  });
  data: Appointment = {
    date: '',
    time: '',
    uid: '',
    userid: '',
    displayName: '',
    comment: ''
  };
  booked = false;
  profs: Array<Profesional> = [];
  user: any;
  startTime: number;
  endTime: number;
  hours: Array<any> = [];
  newHours: Array<any> = [];
  appointments: Array<any> = [];
  profPicked = false;
  datePicked = false;
  prof: any;

  ngOnInit(): void {
    this.loginService.getProfs().subscribe(value => {
      this.profs = value;
      console.log(this.profs);
    });
    this.loginService.user$.subscribe(res => {
      this.user = res;
    });
  }

  getProf(uid: any): void {
    this.loginService.getProfData(uid).subscribe(res => {
      console.log(res);
      this.prof = res ;
      this.calcTime(60, parseFloat(this.prof.startTime), parseFloat(this.prof.endTime));
    });
  }

  getAppDay(date: any, profId: string): void {
    const sub: Observable<any> = this.appointmentService.getDay(this.datePipe.transform(date, 'dd/MM'), profId);
    sub.subscribe(res => {
     console.log(res);
     this.appointments = res;
     this.appointments.forEach(item => {
       console.log(item);
       this.removeHour(item.time);
     });
   });
  }

  onSubmit(): void {
    if (this.newAppointmentForm.valid) {
      console.log(this.newAppointmentForm.value);
      this.data.date = this.datePipe.transform(this.newAppointmentForm.value.date, 'dd/MM');
      this.data.time = this.newAppointmentForm.value.time;
      this.data.uid = this.newAppointmentForm.value.user;
      this.data.comment = this.newAppointmentForm.value.comment;
      this.data.userid = this.user.uid;
      this.data.displayName = this.user.displayName;
      console.log(this.data);
      this.appointmentService.createAppointment(this.data);
      this.newAppointmentForm.reset();
      this.booked = true;
    }
  }

  calcTime(gap: any, start: number, end: number): void {
    switch (gap) {
      case 60:
        while (end > start) {
          this.hours.push(`${start}:00`);
          start++; }
        break;
      case 30:
        while (end > start) {
          this.hours.push(`${start}:00`);
          this.hours.push(`${start}:30`);
          start++;
        }
        break;
      case 15:
        while (end > start) {
          this.hours.push(`${start}:00`);
          this.hours.push(`${start}:15`);
          this.hours.push(`${start}:30`);
          this.hours.push(`${start}:45`);
          start++;
        }
    }
    console.log(this.hours);
}

removeHour(hour: any): void {
    const index = this.hours.indexOf(hour);
    this.hours.splice(index, 1);
    console.log(this.hours);
}

filter(): void {
    this.newHours = this.hours;
    this.appointments.forEach( app => {
      const index = this.newHours.indexOf(app);
      this.newHours.splice(index, 1);
    });
    console.log(this.newHours);
}
  timeToNUmber(time: string): number {
    switch (Number(this.prof.duration)) {
      case 1 :
        if (time.length < 5) {
          const res = time.substr(0, 1);
          return Number(res);
        } else {
          const res = time.substr(0, 2);
          return Number(res);
        }
        break;
      case 30:
        if (time.length < 5) {
          const res = time.substr(0, 1) + time.substr(2, 4) ;
          return Number(res);
        } else {
          const res = time.substr(0, 2) + time.substr(3, 5);
          return Number(res);
        }
        break;
      case 15:
        if (time.length < 5) {
          const res = time.substr(0, 1) + time.substr(2, 4) ;
          return Number(res);
        } else {
          const res = time.substr(0, 2) + time.substr(3, 5);
          return Number(res);
        }
        break;
    }
  }
}
