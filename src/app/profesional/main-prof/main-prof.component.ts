import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-main-prof',
  templateUrl: './main-prof.component.html',
  styleUrls: ['./main-prof.component.scss']
})
export class MainProfComponent implements OnInit, OnDestroy {

  constructor(public loginService: LoginService,
              public router: Router
              ) { }
  profId: string;
  loading = true;
  subscription: Subscription;

  ngOnInit(): void {
   this.subscription = this.loginService.user$.subscribe(res => {
      if (res.profId) {
        this.profId = res.profId;
        console.log(this.profId);
      } else {
        this.loginService.createProf(res);
        this.loading = false;
        this.router.navigate(['/prof/profile']);
        this.loading = false;
      }
      this.loading = false;
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
