import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from '../config/general-data';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  url: string = GeneralData.USERS_URL;
  token: string = '';
  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) { 
    this.token = this.securityService.ObtenerToken();
  }
  ListRequest() {    
    return this.http.get(`${this.url}/solicitudes`);
  }
}

