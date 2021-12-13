import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { RequestModelClass } from '../models/solicitud.model';
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

  SendRequest(solicitud: RequestModelClass): Observable<RequestModelClass> {
    return this.http.post<RequestModelClass>(`${this.url}/solicitudes`, solicitud);
  }

  ModifyRequest(solicitud: RequestModelClass): Observable<any>{
    return this.http.put<RequestModelClass>(`${this.url}/solicitudes/${solicitud.id}`, solicitud);
  }
}

