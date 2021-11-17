import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {Administrador} from '../models';
import {AdministradorRepository, AsesorRepository, ClienteRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const generator = require('password-generator');
const encrypt = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @repository(ClienteRepository)
    public clienteRepository: ClienteRepository,
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
  ) {}

  /*
   * Add service methods here
   */

  GenerarClaveAleatoria() {
    let clave = generator(8, false);
    return clave;
  }

  EncriptarClave(clave: string) {
    let clave_encriptada = encrypt.MD5(clave).toString();
    return clave_encriptada;
  }


  //Bloque de codigo para usar el Login
  IdentificarPersona(usuario: string, clave: string, role: string = 'cliente') {
    try {
      let person;
      if (role === 'administrador') {
        person = this.administradorRepository.findOne({
          where: {email: usuario, clave: clave},
        });
      } else if (role === 'cliente') {
        person = this.clienteRepository.findOne({
          where: {email: usuario, clave: clave},
        });
      } else if (role === 'asesor') {
        person = this.asesorRepository.findOne({
          where: {email: usuario, clave: clave},
        });
      }
      if (person) {
        return person;
      } else {
        console.log('Ha ocurrido un error al realizar la identificacion.');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  //Bloque de codigo para usar el Login
  IdentificarAdministrador(usuario: string, clave: string) {
    try {
      let admin = this.administradorRepository.findOne({
        where: {email: usuario, clave: clave},
      });
      if (admin) {
        return admin;
      } else {
        console.log('Ha ocurrido un error al realizar la identificacion.');
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  GenerarTokenJWT(persona: any) {
    let token = jwt.sign(
      {
        //tiempo en segundos para que se expire el token programado a 1 hora
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: {
          //id: persona.id,
          nombre_completo: persona.nombre_completo,
          email: persona.email,
          role: persona.tipo_persona,
        },
      },
      Llaves.claveJWT,
    );
    return token;
  }

  ValidarToken(token: string) {
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
