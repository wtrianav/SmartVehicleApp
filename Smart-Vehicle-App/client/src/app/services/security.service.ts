import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { AdvisorCredentialsRegisterModel, ClientCredentialsRegisterModel, UserCredentialsModel, UserLoginSesionModel } from '../models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  url: string = GeneralData.USERS_URL;

  datosUsuarioSesion = new BehaviorSubject<UserLoginSesionModel>(new UserLoginSesionModel());

  constructor(
    private http: HttpClient,
  ) { }

  Login(modelo: UserCredentialsModel): Observable<any> {
    return this.http.post(`${this.url}/login`, {
      usuario: modelo.username,
      clave: modelo.password
    });
  }

  RecoverPassword(modelo: UserCredentialsModel): Observable<any> {
    return this.http.post(`${this.url}/recuperar-clave`, {
      email: modelo.username
    });
  }

  VerificarSesionActual() {
    let datos = localStorage.getItem("Datos-Sesion");
    if (datos) {
      let data = JSON.parse(datos);
      this.RefrescarDatosSesion(data);
      return true;
    } else {
      return false;
    }
  }

  RefrescarDatosSesion(datos: UserLoginSesionModel) {
    this.datosUsuarioSesion.next(datos);
  }

  ObtenerDatosUsuarioEnSesion(): any {
    return this.datosUsuarioSesion.asObservable();
  }

  ObtenerToken() {
    let datosString = localStorage.getItem("DatosSesion");
    if (datosString) {
      let datos = JSON.parse(datosString);
      return datos.token;
    } else {
      return ' ';
    }
  }
}
