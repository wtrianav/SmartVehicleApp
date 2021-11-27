import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Llaves} from '../config/llaves';
import {NotificacionCorreo} from '../models';
const fetch = require('node-fetch');

@injectable({scope: BindingScope.TRANSIENT})
export class NotificacionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Add service methods here
   */

  NotificarPorCorreo(datos: NotificacionCorreo) {
    let url = Llaves.urlNotificaciones;

    //Hacemos fetch para consumir recursos de servicios externos.
    fetch(`${url}/enviar-correo?correo-destino=${datos.destinatario}&asunto=${datos.asunto}&contenido=${datos.contenido}`)
      .then((data: any) => {
        console.log(data);
      });
  }
}
