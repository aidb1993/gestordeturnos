import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-main-prof',
  templateUrl: './main-prof.component.html',
  styleUrls: ['./main-prof.component.scss']
})
export class MainProfComponent implements OnInit {

  constructor(public loginService: LoginService,
              public router: Router
              ) { }
  profId: string;
  loading = true;

  ngOnInit(): void {
    this.loginService.user$.subscribe(res => {
      if (res.profId) {
        this.profId = res.profId;
        console.log(this.profId);
      } else {
        this.loginService.createProf(res.uid);
        this.router.navigate(['/prof']);
      }
      this.loading = false;
    });
  }

}
