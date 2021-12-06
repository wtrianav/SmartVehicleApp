import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import {repository} from '@loopback/repository';
import {CambioClave, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {Llaves} from '../config/llaves';
const generator = require('password-generator');
const encrypt = require('crypto-js');
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

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
  IdentificarPersona(usuario: string, clave: string,) {
    try {
      let person = this.personaRepository.findOne({
        where: {email: usuario, clave: clave},
      });

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

  async CambiarClave(credencialesClave: CambioClave): Promise<Boolean> {
    let person = await this.personaRepository.findOne({
      where: {
        email: credencialesClave.email,
        clave: credencialesClave.clave_actual,
      },
    });
    if (person) {
      person.clave = credencialesClave.clave_nueva;
      await this.personaRepository.updateById(person?.id, person);
      return true;
    } else {
      return false;
    }
  }

  async RecuperarClave(email: string, clave: string): Promise<Persona | null> {
    let person = await this.personaRepository.findOne({
      where: {
        email: email
      },
    });
    if (person) {
      person.clave = this.EncriptarClave(clave)
      await this.personaRepository.updateById(person.id, person)
        .then(() => {
          console.log('Se ha actualizado la contraseña satisfactoriamente');
        })
        .catch(() => {
          console.log('No se ha encontrado el registro a actualizar');
        });
      return person;
    } else {
      return null;
    }
  }
}
