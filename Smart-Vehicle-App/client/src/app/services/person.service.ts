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

  AlmacenarDatosAsesor(asesor: AdvisorCredentialsRegisterModel) {
    let stringAsesor = JSON.stringify(asesor);
    localStorage.setItem("DatosAsesor", stringAsesor);
    this.RefrescarDatosAsesor(asesor);
  }

  ObtenerInformacionAsesor() {
    let stringAsesor = localStorage.getItem("DatosAsesor");
    if (stringAsesor) {
      let asesor = JSON.parse(stringAsesor);
      return asesor;
    } else {
      return null;
    }
  }

  RefrescarDatosAsesor(datos: AdvisorCredentialsRegisterModel) {
    this.datosAsesor.next(datos);
  }

  ObtenerDatosAsesor(): any {
    return this.datosAsesor.asObservable();
  }

}

