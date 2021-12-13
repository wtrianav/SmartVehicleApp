import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { AdvisorCredentialsRegisterModel } from '../models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  //URL Para conectarse al backend
  url : string = GeneralData.USERS_URL;
  //Propiedad subjetc para manipular datos del asesor en el localstorage del navegador
  datosAsesor = new BehaviorSubject<AdvisorCredentialsRegisterModel>(new AdvisorCredentialsRegisterModel());

  //Es necesario inyectar la dependecia HttpClient para hacer peticiones al backend
  constructor(
    private http: HttpClient,
  ) { }

  //Metodos para consultar el backend y obtener informacion

  CrearAsesor(asesor: AdvisorCredentialsRegisterModel): Observable<any>{
    return this.http.post<AdvisorCredentialsRegisterModel>(`${this.url}/asesores`, asesor);
  }

  ActualizarAsesor(asesor: AdvisorCredentialsRegisterModel): Observable<any>{
    return this.http.patch<AdvisorCredentialsRegisterModel>(`${this.url}/asesores/${asesor.id}`, asesor, {
      headers: new HttpHeaders({
        // 'Authorization' : `Bearer ${this.token}`
      })
    })
  }

  EliminarAsesor(id: string): Observable<any>{
    return this.http.delete(`${this.url}/asesores/${id}`);
  }

  ListarAsesor() : Observable<any> {
    return this.http.get<any>(`${this.url}/asesores`);
  }

  ObtenerAsesorPorId(id: string): Observable<any>{
    return this.http.get(`${this.url}/asesores/${id}`)
  }

  //Devuelve un asesor
  BuscarAsesor() : Observable<any> {
    return this.http.get<any>(`${this.url}/asesor`);
  }

  //Metodos para almacenar informacion en el localstorage del navegador

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
