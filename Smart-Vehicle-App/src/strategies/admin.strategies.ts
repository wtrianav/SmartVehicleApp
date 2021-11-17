import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, RedirectRoute} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Request} from 'express';
import parseBearerToken from 'parse-bearer-token';
import {service} from '@loopback/core';
import {AutenticacionService} from '../services';

export class EstrategiaAdministrador implements AuthenticationStrategy {
  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  //Nombre de la estrategia para usarla en la autenticacion
  name: string = 'admin';
  async authenticate(request: Request): Promise<UserProfile | undefined> {
    let token = parseBearerToken(request);
    if (token) {
      let datos = this.servicioAutenticacion.ValidarToken(token);
      if (datos) {
        if (datos.data.role === 'administrador') {
          let perfil: UserProfile = Object.assign({
            nombre_completo: datos.data.nombre_completo,
          });
          return perfil;
        } else {
          throw new HttpErrors[401]('Usted no tiene permiso para ingresar aca.')
        }
      } else {
        throw new HttpErrors[401]('El token que se ha ingresado no es valido.');
      }
    } else {
      throw new HttpErrors[401](
        'El token de autorizacion no ha sido ingresado.',
      );
    }
  }
}
