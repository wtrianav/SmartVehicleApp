import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from '../config/general-data';
import { UserFormModel } from '../models/form-user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = GeneralData.USERS_URL;
  destinatario = "lperdomoduran@outlook.com";
  asunto = "Comentario de cliente";
  constructor(private http:HttpClient) { }

  SendEmail (formUser: UserFormModel) :Observable<any> {
  return this.http.post(`${this.url}/enviar-formulario`, {
      nombre: formUser.nombre,
      email: formUser.email,
      comentario: formUser.comentario
  });
  }

}
