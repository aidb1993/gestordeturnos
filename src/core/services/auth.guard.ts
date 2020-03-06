import { Injectable } from '@angular/core';
import { loggedIn } from '@angular/fire/auth-guard';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { LoginService } from './login.service';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private login: LoginService
                ) {
    }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.login.user$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedin => {
        if (!loggedin) {
          console.log('please log in');
          this.router.navigate(['/landing']);
        }
      })
    );
  }




}
