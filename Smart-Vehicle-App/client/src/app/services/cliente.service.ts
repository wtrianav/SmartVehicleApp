import { Injectable } from '@angular/core';
import { GeneralData } from '../config/general-data';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  url: string = GeneralData.API_DPTO;

 

  constructor(
    private http: HttpClient
  ) { }

  ObtenerDepartamentos() {
    return this.http.get(this.url);
  }


}
