import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from '../core/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(public loginService: LoginService,
              public snackBar: MatSnackBar
  ) {
  }
  title = 'appointmentmanager';
  logged = false;

  async login(): Promise<any> {
   await this.loginService.googleSingIn();
   this.snackBar.open('Sesion Iniciada', '', {
      duration: 3000});
  }
  async logout(): Promise<any> {
    await this.loginService.signOut();
    this.snackBar.open('Sesion Cerrada', '', {
      duration: 3000
    });
  }
}
