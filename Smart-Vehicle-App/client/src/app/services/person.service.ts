import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {GeneralData} from '../config/general-data';
import {AdvisorCredentialsRegisterModel} from '../models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  url: string = GeneralData.USERS_URL;
  constructor(private http: HttpClient) { }

  ObtenerRegistros(): Observable<any> {
    return this.http.get<any>(`${this.url}/personas`);
  }

  CrearAsesor(asesor: AdvisorCredentialsRegisterModel): Observable<any>{
    return this.http.post<AdvisorCredentialsRegisterModel>(`${this.url}/personas`, asesor, {
      headers: new HttpHeaders({
        // 'Authorization' : `Bearer ${this.token}`
      })
    })
  }

  ActualizarAsesor(asesor: any): Observable<any>{
    return this.http.put<AdvisorCredentialsRegisterModel>(`${this.url}/personas/${asesor.id}`, asesor, {
      headers: new HttpHeaders({
        // 'Authorization' : `Bearer ${this.token}`
      })
    })
  }

  EliminarAsesor(id: string): Observable<any>{
    return this.http.delete(`${this.url}/personas/${id}`, {
      headers: new HttpHeaders({
        // 'Authorization' : `Bearer ${this.token}`
      })
    })
  }

  ObtenerRegistroPorId(id: string): Observable<any>{
    return this.http.get(`${this.url}/personas/${id}`)
  }
}

