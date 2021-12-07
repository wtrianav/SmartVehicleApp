import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AdvisorCredentialsRegisterModel} from '../models/user-credentials';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  url = 'http://localhost:3000';
  token: String = "";
  constructor(private http:HttpClient, private securityService: SecurityService) {
    this.token = securityService.ObtenerToken();
   }

  ObtenerRegistros(): Observable<AdvisorCredentialsRegisterModel[]> {
    return this.http.get<AdvisorCredentialsRegisterModel[]>(`${this.url}/asesores`);
  }

  CrearAsesor(asesor: AdvisorCredentialsRegisterModel): Observable<AdvisorCredentialsRegisterModel>{
    return this.http.post<AdvisorCredentialsRegisterModel>(`${this.url}/asesores`, asesor, {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token}`
      })
    })
  }

  ActualizarAsesor(asesor: AdvisorCredentialsRegisterModel): Observable<AdvisorCredentialsRegisterModel>{
    return this.http.put<AdvisorCredentialsRegisterModel>(`${this.url}/asesores`, asesor, {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token}`
      })
    })
  }

  EliminarAsesor(id: string): Observable<any>{
    return this.http.delete(`${this.url}/asesores/${id}`, {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.token}`
      })
    })
  }
}
