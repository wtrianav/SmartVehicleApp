import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from '../config/general-data';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url: string = GeneralData.USERS_URL;

  constructor(
    private http: HttpClient
  ) { }

  FiltrarPorCarro() {
    return this.http.get(`${this.url}/filtrar-carros`)
  }

  FiltrarPorMoto() {
    return this.http.get(`${this.url}/filtrar-motocicletas`)
  }

  FiltrarTodos() {
    return this.http.get(`${this.url}/vehiculos`)
  }

  FiltrarPorScooter() {
    return this.http.get(`${this.url}/filtrar-scooters`)
  }
}
