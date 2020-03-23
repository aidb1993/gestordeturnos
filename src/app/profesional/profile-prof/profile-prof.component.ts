import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable, pipe, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { Profesional } from '../../../core/models/profesional.model';
import { AppointmentService } from '../../../core/services/appointment.service';
import { LoginService } from '../../../core/services/login.service';

@Component({
  selector: 'app-profile-prof',
  templateUrl: './profile-prof.component.html',
  styleUrls: ['./profile-prof.component.scss']
})
export class ProfileProfComponent implements OnInit, OnDestroy {
  userData: any;
  loading = false;
  profData: any = {
  };
  startTime = new FormControl('');
  endTime = new FormControl('');
  duration = new FormControl('');
  timeFrame = [];
  timeLoaded = false;
  subs: Subscription;

  constructor(public loginService: LoginService,
              public appointmentService: AppointmentService,
              public fb: FormBuilder
  ) { }

  ngOnInit(): void {
     this.subs = (this.loginService.user$.subscribe(res => {
       if (res != null) {
         this.userData = res;
         console.log(this.userData);
         this.loginService.getProfData(res.profId).pipe(take(1)).subscribe(res2 => {
           this.profData = res2;
           console.log(res2);
           if (this.timeFrame.length === 0 || this.timeLoaded === false ) {
             this.timeFrame = this.appointmentService.calcTime(Number(this.profData.duration), 0, 24);
             console.log(this.timeFrame);
             this.timeLoaded = true;
           }
           this.startTime.setValue(this.profData.startTime);
           this.endTime.setValue(this.profData.endTime);
           this.duration.setValue(this.profData.duration);
         });
         this.loading = false;
       }
       return this.loading = false;
     }));
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
    this.timeFrame.length = 0;
  }

  submit(value: any, type: string): void {
    console.log(this.profData.profId, type, value);
    this.loginService.updateProf(this.profData.profId, type, value);
  }

  timeToNUmber(time: string): number {
    switch (Number(this.profData.duration)) {
      case 1 :
        if (time.length < 5) {
          const res = time.substr(0, 1);
          return Number(res);
        } else {
          const res = time.substr(0, 2);
          return Number(res);
        }
        break;
      case 30:
        if (time.length < 5) {
          const res = time.substr(0, 1) + time.substr(2, 4) ;
          return Number(res);
        } else {
          const res = time.substr(0, 2) + time.substr(3, 5);
          return Number(res);
        }
        break;
      case 15:
        if (time.length < 5) {
          const res = time.substr(0, 1) + time.substr(2, 4) ;
          return Number(res);
        } else {
          const res = time.substr(0, 2) + time.substr(3, 5);
          return Number(res);
        }
        break;
    }
    }

    numberToTime(time: number): string {
      let res = '';
      if (time.toString().length === 2) {
        res = `00${time}`;
      } else if (time.toString().length === 3) {
        const txt = time.toString();
        res = `0${txt.substr(0, 1)}${txt.substr(1)}`;
      } else {
        const txt = time.toString();
        res = `${txt.substr(0, 2)}${txt.substr(2, 4)}`;
      }
      return res;
    }

    calcTimeFrame(duration): void {
      this.timeFrame = [''];
      this.timeFrame = this.appointmentService.calcTime(Number(duration), 0, 24);
      console.log(this.timeFrame);
    }
}
