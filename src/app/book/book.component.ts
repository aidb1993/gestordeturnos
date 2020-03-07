import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Appointment } from '../../core/models/appointment.model';
import { AppointmentService } from '../../core/services/appointment.service';
import { LoginService } from '../../core/services/login.service';

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
    user : new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  data: Appointment = {
    date: '',
    time: '',
    user: ''
  };
  booked = false;
  profs = [];

  ngOnInit(): void {
    this.loginService.getProfs().subscribe(value => {
      this.profs = value;
    });
  }

  onSubmit(): void {
    if (this.newAppointmentForm.valid) {
      console.log(this.newAppointmentForm.value);
      this.data.date = this.datePipe.transform(this.newAppointmentForm.value.date, 'dd/MM');
      this.data.time = this.newAppointmentForm.value.time;
      this.data.user = this.newAppointmentForm.value.user;
      console.log(this.data);
      this.appointmentService.createAppointment(this.data);
      this.newAppointmentForm.reset();
      this.booked = true;
    }
  }

}
