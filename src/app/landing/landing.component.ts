import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AppointmentService } from '../../core/services/appointment.service';
import { LoginService } from '../../core/services/login.service';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  constructor(public loginService: LoginService,
              public router: Router,
              public snackBar: MatSnackBar,
              public appointmentService: AppointmentService
  ) { }

  data: string;
  user: any;
  sessionInfo: any;
  isAdmin: boolean;
  loading = true;

  ngOnInit(): void {
    this.loginService.user$.subscribe(value => {
      if (value != null) {
        this.sessionInfo = value;
        if (this.sessionInfo.isAdmin === true && this.sessionInfo.isAdmin != null) {
          this.isAdmin = true;
        } else {
          this.isAdmin = false;
        }
      }
      this.loading = false;
    });
  }

  navigate(): any {
    this.loading = true;
    if (this.sessionInfo) {
      this.router.navigate(['/prof']);
    } else {
      this.snackBar.open('Por Favor inicia sesion', '', {
        duration: 3000
      });
    }
    this.loading = false;
  }





}
