import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { ClientCredentialsRegisterModel, UserCredentialsModel } from '../models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  url: string = GeneralData.USERS_URL;

  constructor(
    private http: HttpClient
  ) { }

  Login(modelo: UserCredentialsModel) : Observable<any> {
    return this.http.post(`${this.url}/login-cliente`, {
      usuario: modelo.username,
      clave: modelo.password
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
}
