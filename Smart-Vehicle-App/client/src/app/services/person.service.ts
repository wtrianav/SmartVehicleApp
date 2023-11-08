import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {GeneralData} from '../config/general-data';
import {AdvisorCredentialsRegisterModel} from '../models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url: string = GeneralData.USERS_URL;
  datosAsesor = new BehaviorSubject<AdvisorCredentialsRegisterModel>(new AdvisorCredentialsRegisterModel());
  constructor(private http: HttpClient) { }
}

