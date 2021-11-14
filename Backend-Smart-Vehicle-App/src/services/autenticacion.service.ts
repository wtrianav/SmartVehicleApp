import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { Administrador } from '../models';
import { AdministradorRepository } from '../repositories';
import { Llaves } from '../config/llaves';
const generator = require("password-generator");
const encrypt = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository : AdministradorRepository
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
  IdentificarAdministrador(usuario: string, clave: string) {
    try {
      let admin = this.administradorRepository.findOne({where: {email: usuario, clave: clave}});
      if(admin) {
        return admin;
      } else {
        console.log("Ha ocurrido un error al realizar la identificacion.")
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  GenerarTokenJWT(administrador: Administrador) {
    let token = jwt.sign({
      //tiempo en segundos para que se expire el token
      data: {
        id: administrador.id,
        nombre_completo: administrador.nombre_completo,
        email: administrador.email
      }
    },
    Llaves.claveJWT);
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
