import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { Vehiculo } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url: string = GeneralData.USERS_URL;
  @Output () CardTrigger: EventEmitter<any> = new EventEmitter();
  datosVehiculo = new BehaviorSubject<Vehiculo>(new Vehiculo());


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

  BuscarVehiculo(id:string) {
    return this.http.get(`${this.url}/vehiculos/${id}`);
  }

  AlmacenarDatosVehiculo(vehiculo: Vehiculo) {
    let stringVehiculo = JSON.stringify(vehiculo);
    localStorage.setItem('DatosVehiculo:', stringVehiculo);
    this.RefrescarDatosVehiculo(vehiculo);
  }

  ObtenerInformacionVehiculo() {
    let vehiculoString = localStorage.getItem('DatosVehiculo');
    if(vehiculoString) {
      let vehiculo = JSON.parse(vehiculoString);
      return vehiculo;
    } else {
      return null;
    }
  }

  EliminarDatosVehiculo() {
    localStorage.removeItem('DatosVehiculo');

  }

  RefrescarDatosVehiculo(datos: Vehiculo) {
    this.datosVehiculo.next(datos);
  }

  ObtenerDatosVehiculos(): any {
    return this.datosVehiculo.asObservable();
  }


}
