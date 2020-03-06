import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
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
              public snackBar: MatSnackBar
  ) { }

  data: string;
  user: any;
  sessionInfo: any;

  ngOnInit(): void {
    this.loginService.user$.subscribe(value => {
      this.sessionInfo = value;
    });
  }

  navigate(): any {
    if (this.sessionInfo) {
      this.router.navigate(['/admin']);
    } else {
      this.snackBar.open('Por Favor inicia sesion', '', {
        duration: 3000
      });
    }
  }





}
