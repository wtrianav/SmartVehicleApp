import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeneralData } from '../config/general-data';
import { UserFormModel } from '../models/form-user.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  url = 'http://localhost:5000';
  destinatario = "wtriana@outlook.com";
  asunto = "Comentario de cliente";
  constructor(private http:HttpClient) { }

  SendEmail (formUser: UserFormModel) {
    let contenido = `<td class="esd-stripe" align="center">
    <table class="es-content-body" style="background-color: transparent;" width="640" cellspacing="0" cellpadding="0" align="center">
        <tbody>
            <tr>
                <td class="esd-structure es-p10t es-p20r es-p20l" align="left">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="600" valign="top" align="center">
                                    <table width="100%" cellspacing="0" cellpadding="0">
                                        <tbody>
                                            <tr>
                                                <td class="esd-block-image es-p40t es-p25b" align="center" style="font-size:0"><a href="https://viewstripo.email" target="_blank"><img src="https://tlr.stripocdn.email/content/guids/CABINET_729b6a94015d410538fa6f6810b21b85/images/90451519716512050.png" style="display: block;" alt="Logo" title="Logo" width="50"></a></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
            <tr>
                <td class="esd-structure es-p25t es-p20b es-p20r es-p20l" align="left">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <td class="esd-container-frame" width="600" valign="top" align="center">
                                    <table style="background-color: #ffffff; border-radius: 3px; border-collapse: separate;" width="100%" cellspacing="0" cellpadding="0" bgcolor="#ffffff">
                                        <tbody>
                                            <tr>
                                                <td class="esd-block-text es-p40t es-p10b es-p40r es-p40l" align="left" bgcolor="transparent">
                                                    <p style="color: #999999;">Saludos,<br>Este correo electrónico se envia desde ${formUser.email}<br><br>Comentarios:<br><br>${formUser.comentario}</p>
                                                    <p style="color: #999999;"><br></p>
                                                    <p style="color: #999999;">Atentamente<br>${formUser.nombre}</p>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="esd-block-text es-p40b es-p40r es-p40l" align="left">
                                                    <p><br></p>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
  </td>`;

  return this.http.get(`${this.url}/enviar-correo?correo-destino=${this.destinatario}&asunto=${this.asunto}&contenido=${contenido}`)
  }

}
