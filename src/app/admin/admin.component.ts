import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user.model';
import { LoginService } from '../../core/services/login.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private loginService: LoginService) { }
  users: Array<User>

  ngOnInit(): void {
    this.loginService.getUsers().subscribe(res => {
      this.users = res;
      console.log(this.users);
    });
  }

}
