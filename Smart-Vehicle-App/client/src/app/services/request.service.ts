import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from '../config/general-data';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = GeneralData.USERS_URL;
  constructor(
    private http: HttpClient,
  ) { }
  ListRequest() {
    return this.http.get(`${this.url}/solicitudes`);
  }
}

