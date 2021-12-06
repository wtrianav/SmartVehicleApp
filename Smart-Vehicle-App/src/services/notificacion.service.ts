import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {Llaves} from '../config/llaves';
import {NotificacionCorreo, Persona} from '../models';
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

  NotificarPorSMS(persona: Persona) {
    //Notificacion por mensaje de texto SE DEBE CAMBIAR EL PEDAZO DONDE SE MANDA LA CLAVE YA QUE ESA ES LA ENCRYPTADA EN LA BD
    let numero_destino = persona.telefono;
    let contenido_sms = `Hola ${persona.nombre_completo}, su usuario para ingresar a la plataforma Smart Vehicle es
    ${persona.email} y su clave es: ${persona.clave}`;
    fetch(
      `${Llaves.urlNotificaciones}/sms?mensaje=${contenido_sms}&telefono=${numero_destino}`,
    ).then((data: any) => {
      console.log(data);
    });
  }
}
