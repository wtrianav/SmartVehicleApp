import { Injectable } from '@angular/core';
import { GeneralData } from '../config/general-data';
import { HttpClient } from '@angular/common/http';
import { ClientCredentialsRegisterModel } from '../models/user-credentials';
import { Observable } from 'rxjs';
import { ClientRegisteredComponent } from '../modules/administration/client/create-client/create-client.component';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url_dpto: string = GeneralData.API_DPTO;
  url: string = GeneralData.USERS_URL;

 

  constructor(
    private http: HttpClient
  ) { }

  CrearCliente(cliente: ClientCredentialsRegisterModel): Observable<any> {
    return this.http.post<ClientCredentialsRegisterModel>(`${this.url}/clientes`, cliente);
  }

  EliminarCliente(id: string): Observable<any>{
    return this.http.delete(`${this.url}/clientes/${id}`);
  }

  ObtenerDepartamentos() {
    return this.http.get(this.url_dpto);
  }


}
