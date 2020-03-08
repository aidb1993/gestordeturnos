import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-profile-prof',
  templateUrl: './profile-prof.component.html',
  styleUrls: ['./profile-prof.component.scss']
})
export class ProfileProfComponent implements OnInit {
  userData: any;
  loading = false;
  profData: any;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
   this.loginService.user$.subscribe(res => {
    if (res != null) {
      this.userData = res;
      console.log(this.userData);
      this.loginService.getProfData(res.profId).subscribe(res2 => {
        this.profData = res2;
      });
      this.loading = false;
    }
    return this.loading = false;
   });
  }

}
