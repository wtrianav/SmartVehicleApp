import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { Vehiculo } from '../models/vehiculo.model';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  url: string = GeneralData.USERS_URL;
  @Output () CardTrigger: EventEmitter<any> = new EventEmitter();
  datosVehiculo = new BehaviorSubject<Vehiculo>(new Vehiculo());
  token: string = '';


  constructor(
    private http: HttpClient,
    private securityService: SecurityService,
  ) { 
    this.token = this.securityService.ObtenerToken();
  }



  ListarVehiculos(): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(`${this.url}/vehiculos`)
  }



  CrearVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.post<Vehiculo>(`${this.url}/vehiculos`, vehiculo, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  ActualizarVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
    return this.http.put<Vehiculo>(`${this.url}/vehiculos/${vehiculo.id}`, vehiculo, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  EliminarVehiculo(id: string): Observable<any>{
    return this.http.delete(`${this.url}/vehiculos/${id}`, {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.token}`
      })
    })
  }

  BuscarVehiculo(id:string) {
    return this.http.get(`${this.url}/vehiculos/${id}`);
  }

  AlmacenarDatosVehiculo(vehiculo: Vehiculo, solicitud: string = 'Alquiler') {
    vehiculo.solicitud = solicitud;
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
