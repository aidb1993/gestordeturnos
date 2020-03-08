import { Profesional } from './profesional.model';

export interface Appointment {
  uid: string;
  date: string;
  time: string;
  comment?: string;
  id?: string;
  userid: string;
  displayName: string;
}

export interface UserAppointment {
  uid: string;
  date: string;
  time: string;
  comment?: string;
  id?: string;
  userid: string;
  displayName: string;
  profesional: Profesional;
}
