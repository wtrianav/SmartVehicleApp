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
    }, {
      headers: new HttpHeaders({

      })
    });
  }

  RecoverPassword(modelo: UserCredentialsModel): Observable<any> {
    return this.http.post(`${this.url}/recuperar-clave`, {
      email: modelo.username
    });
  }

  RegisterCliente(modelo: ClientCredentialsRegisterModel): Observable<any> {
    return this.http.post(`${this.url}/personas`, {
      tipo_documento: modelo.tipo_documento,
      nro_documento: modelo.numero_documento,
      nombre_completo: modelo.nombre_completo,
      departamento: modelo.departamento,
      ciudad: modelo.ciudad,
      direccion: modelo.direccion,
      telefono: modelo.telefono,
      email: modelo.email,
      tipo_persona: modelo.tipo_persona,
    })
  }

  RegisterAsesor(modelo: AdvisorCredentialsRegisterModel): Observable<any> {
    return this.http.post(`${this.url}/personas`, {
      nro_documento: modelo.nro_documento,
      nombre_completo: modelo.nombre_completo,
      telefono: modelo.telefono,
      email: modelo.email,
      tipo_persona: modelo.tipo_persona,
    })
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
