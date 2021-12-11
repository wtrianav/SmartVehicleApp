import { Injectable } from '@angular/core';
import { UserLoginSesionModel } from 'src/app/models/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }


  GuardarDatosLocalStorage( data: UserLoginSesionModel ) :  boolean {
    let datosDeSesion = localStorage.getItem("Datos-Sesion")
    if(datosDeSesion) {
      return false;
    } else {
      data.identificado = true;
      let datosSesionString = JSON.stringify(data);
      localStorage.setItem("Datos-Sesion", datosSesionString);
      return true;
    }
  }

  EliminarDatosSesion() : boolean {
    let datosDeSesion = localStorage.getItem("Datos-Sesion");
    if(datosDeSesion) {
      localStorage.removeItem("Datos-Sesion");
      localStorage.clear();
      return true;
    } else {
      return false;
    }
  }

  ObtenerDatosSesion() : any {
    let datosDeSesion = localStorage.getItem("Datos-Sesion");
    if(datosDeSesion) {
      let data = JSON.parse(datosDeSesion);
      return data;
    } else {
      return null;
    }
  }

}
