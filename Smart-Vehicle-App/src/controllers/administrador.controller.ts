import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
  HttpErrors,
} from '@loopback/rest';
import {Llaves} from '../config/llaves';
import {Administrador, Credenciales} from '../models';
import {AdministradorRepository} from '../repositories';
import {AutenticacionService} from '../services'; //Se hace import desde services del servicio de autenticacion
const fetch = require('node-fetch');

export class AdministradorController {
  constructor(
    @repository(AdministradorRepository)
    public administradorRepository: AdministradorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  //Metodo del BackEnd para ejecutar el Login Admin
  @post('/login-admin')
  @response(200, {
    description: 'Login de clientes a la plataforma',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async identificarAdministrador(
    @requestBody() credenciales: Credenciales
  ) {
    let person = await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave, 'administrador');
    if (person) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(person);
      return {
        datos: {
          nombre: person.nombre_completo,
          email: person.email,
          role: "administrador"
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]('Datos ingresados no son validos, intente nuevamente.')
    }
  }

  //Metodo del BackEnd para ejecutar el Register
  @post('/administradores')
  @response(200, {
    description: 'Administrador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administrador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {
            title: 'NewAdministrador',
            exclude: ['id'],
          }),
        },
      },
    })
    administrador: Omit<Administrador, 'id'>,
  ): Promise<Administrador> {
    //Se hace uso del servicio de autenticacion
    let clave = this.servicioAutenticacion.GenerarClaveAleatoria();
    let clave_encriptada = this.servicioAutenticacion.EncriptarClave(clave);

    //Se encripta la clave para enviarla a la base de datos
    administrador.clave = clave_encriptada;
    let admin = await this.administradorRepository.create(administrador);

    //Notificacion por mensaje de texto
    let numero_destino = administrador.telefono;
    let contenido_sms = `Hola ${administrador.nombre_completo}, su usuario para ingresar a la plataforma Smart Vehicle es 
    ${administrador.email} y su clave es: ${clave}`;
    fetch(
      `${Llaves.urlNotificaciones}/sms?mensaje=${contenido_sms}&telefono=${numero_destino}`,
    ).then((data: any) => {
      console.log(data);
    });

    //Notificacion por correo al usuario
    let destino = administrador.email;
    let asunto = 'Registro a la plataforma Smart Vehicle';
    let contenido = `Hola ${administrador.nombre_completo}, su usuario para ingresar a la plataforma Smart Vehicle es 
    ${administrador.email} y su clave es: ${clave}`;
    fetch(
      `${Llaves.urlNotificaciones}/enviar-correo?correo-destino=${destino}&asunto=${asunto}&contenido=${contenido}`,
    ).then((data: any) => {
      console.log(data);
    });
    return admin;
  }

  @get('/administradores/count')
  @response(200, {
    description: 'Administrador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.count(where);
  }

  @get('/administradores')
  @response(200, {
    description: 'Array of Administrador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administrador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administrador) filter?: Filter<Administrador>,
  ): Promise<Administrador[]> {
    return this.administradorRepository.find(filter);
  }

  @patch('/administradores')
  @response(200, {
    description: 'Administrador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
    @param.where(Administrador) where?: Where<Administrador>,
  ): Promise<Count> {
    return this.administradorRepository.updateAll(administrador, where);
  }

  @get('/administradores/{id}')
  @response(200, {
    description: 'Administrador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administrador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administrador, {exclude: 'where'})
    filter?: FilterExcludingWhere<Administrador>,
  ): Promise<Administrador> {
    return this.administradorRepository.findById(id, filter);
  }

  @patch('/administradores/{id}')
  @response(204, {
    description: 'Administrador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administrador, {partial: true}),
        },
      },
    })
    administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.updateById(id, administrador);
  }

  @put('/administradores/{id}')
  @response(204, {
    description: 'Administrador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administrador: Administrador,
  ): Promise<void> {
    await this.administradorRepository.replaceById(id, administrador);
  }

  @del('/administradores/{id}')
  @response(204, {
    description: 'Administrador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradorRepository.deleteById(id);
  }
}
