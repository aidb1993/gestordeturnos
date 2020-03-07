import { Component, OnInit } from '@angular/core';
import { Appointment, UserAppointment } from '../../../core/models/appointment.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-client-appointments',
  templateUrl: './client-appointments.component.html',
  styleUrls: ['./client-appointments.component.scss']
})
export class ClientAppointmentsComponent implements OnInit {

  constructor(public loginService: LoginService,
              public appointmentService: AppointmentService
              ) { }
  userData: any;
  appointments: Array<UserAppointment>;

  ngOnInit(): void {
    this.loginService.user$.subscribe(res => {
      this.userData = res;
      this.getApps();
    });
  }

  getApps(): Array<UserAppointment> {
    this.appointmentService.getClientApp(this.userData.uid).subscribe(res => {
      this.appointments = res;
      console.log(this.appointments);
    });
    return this.appointments;
  }

}
