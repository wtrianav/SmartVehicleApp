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
    private http: HttpClient
  ) { }

  Login(modelo: UserCredentialsModel) : Observable<any> {
    return this.http.post(`${this.url}/login-cliente`, {
      usuario: modelo.username,
      clave: modelo.password
    }, {
      headers: new HttpHeaders({

      })
    });
  }

  RecoverPassword(modelo : UserCredentialsModel) : Observable<any> {
    return this.http.post(`${this.url}/recuperar-clave-cliente`, {
      email: modelo.username
    });
  }

  RegisterCliente(modelo: ClientCredentialsRegisterModel) : Observable<any> {
    return this.http.post(`${this.url}/register-clientes`, {
      tipo_documento: modelo.tipo_documento,
      nro_documento: modelo.numero_documento,
      nombre_completo: modelo.nombre_completo,
      departamento: modelo.departamento,
      ciudad: modelo.ciudad,
      direccion: modelo.direccion,
      telefono: modelo.telefono,
      email: modelo.email
    })
  }

  RegisterAsesor(modelo: AdvisorCredentialsRegisterModel) : Observable<any> {
    return this.http.post(`${this.url}/register-asesores`, {
      nro_documento: modelo.numero_documento,
      nombre_completo: modelo.nombre_completo,
      telefono: modelo.telefono,
      email: modelo.email
    })
  }

  AlmacenarSesion(datos: UserLoginSesionModel) {
    datos.identificado = true;
    let stringDatos = JSON.stringify(datos);
    localStorage.setItem('DatosSesion:', stringDatos);
    this.RefrescarDatosSesion(datos);
  }

  ObtenerInformacionSesion() {
    let datosString = localStorage.getItem("DatosSesion");
    if(datosString) {
      let datos = JSON.parse(datosString);
      return datos;
    } else {
      return null;
    }
  }

  EliminarInformacionSesion() {
    localStorage.removeItem("DatosSesion");
    //Se borran los datos para cerrar sesion
    this.RefrescarDatosSesion(new UserLoginSesionModel()); 
  }

  SesionIniciada() {
    let datosString = localStorage.getItem("DatosSesion");
    return datosString;
  }

  VerificarSesionActual() {
    let datos = this.ObtenerDatosUsuarioEnSesion();
    if(datos) {
      this.RefrescarDatosSesion(datos);
    }
  }

  RefrescarDatosSesion(datos: UserLoginSesionModel) {
    this.datosUsuarioSesion.next(datos);

  }

  ObtenerDatosUsuarioEnSesion(): any {
    return this.datosUsuarioSesion.asObservable();
  }
}
