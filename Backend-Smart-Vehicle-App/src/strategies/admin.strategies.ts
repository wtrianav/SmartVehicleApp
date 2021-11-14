import {AuthenticationStrategy} from '@loopback/authentication';
import {HttpErrors, RedirectRoute} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {Request} from 'express';
import {ParamsDictionary} from 'express-serve-static-core';
import {ParsedQs} from 'qs';
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
        let perfil: UserProfile = Object.assign({
          nombre_completo: datos.data.nombre_completo,
        });
        return perfil;
      } else {
        throw new HttpErrors[401]('Token no valido');
      }
    } else {
      throw new HttpErrors[401]('Datos no validos');
    }
  }
}
