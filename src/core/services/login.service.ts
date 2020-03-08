import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Profesional } from '../models/profesional.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  user$: Observable<User>;
  users: Observable<any>;
  profs: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore,
              private router: Router,
              public snackBar: MatSnackBar,
              private zone: NgZone
              ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
  }

  async googleSingIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    const credential = await this.afAuth.signInWithPopup(provider);
    return  this.updateUserData(credential.user);
  }

  async signOut() {
    await this.afAuth.signOut();
    return this.router.navigate(['/']);
  }

  updateUserData(user) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    };

    return userRef.set(data, {merge: true});
  }

  makeProf(uid: string) {
   const ref = this.afs.collection('users').doc(`${uid}`);
   ref.update({isProf: true});
  }

  getUsers() {
 const ref = this.afs.collection('users');
 this.users = ref.snapshotChanges().pipe(map(user => {
   return user.map(a => {
     return  a.payload.doc.data();
   });
 }));
 return this.users;
}

getProfs() {
  const ref = this.afs.collection('profesionals');
  this.profs = ref.snapshotChanges().pipe(map(changes => {
    return changes.map(a => {
      const data = a.payload.doc.data() as Profesional;
      data.uid = a.payload.doc.id;
      return data;
    });
  }));
  return this.profs;
}

getProfData(profId: string) {
  const ref = this.afs.collection('profesionals').doc(profId);
  const prof = ref.snapshotChanges().pipe(
    map(changes => {
      const data = changes.payload.data();
      return data;
    })
  );
  return prof;
}

createProf(res: any) {
    const ref = this.afs.collection('profesionals');
    ref.add({
      uid : res.uid,
      name: res.displayName
    }).then(docRef => {
      console.log(docRef.id);
      this.afs.collection('users').doc(res.uid).update({
        profId: docRef.id
      });
    });
}


}
@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate {
   admin: boolean;
   prof: boolean;
  constructor(public loginService: LoginService) {
    this.loginService.user$.subscribe(res => {
      this.admin = res.isAdmin;
      this.prof = res.isProf;
    });
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.prof || this.admin) {
      return true;
    }
  }
}
