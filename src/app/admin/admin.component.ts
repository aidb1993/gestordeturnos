import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { User } from '../../core/models/user.model';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(public loginService: LoginService) { }
  users: Array<User>;
  profs: any;

  ngOnInit(): void {
    this.loginService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
    this.loginService.getProfs().pipe(take(1)).subscribe(res => {
      this.profs = res;
    });
  }

}
