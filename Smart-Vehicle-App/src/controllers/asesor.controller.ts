import {authenticate} from '@loopback/authentication';
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
import {Asesor, Credenciales} from '../models';
import {AsesorRepository} from '../repositories';
import {AutenticacionService} from '../services';
const fetch = require('node-fetch');

export class AsesorController {
  constructor(
    @repository(AsesorRepository)
    public asesorRepository: AsesorRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
  ) {}

  //Metodo del BackEnd para ejecutar el Login Asesor
  @post('/login-asesor')
  @response(200, {
    description: 'Login de clientes a la plataforma',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async identificarAdministrador(@requestBody() credenciales: Credenciales) {
    let person = await this.servicioAutenticacion.IdentificarPersona(
      credenciales.usuario,
      credenciales.clave,
     
    );
    if (person) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(person);
      return {
        datos: {
          nombre: person.nombre_completo,
          email: person.email,
          role: 'asesor',
        },
        token: token,
      };
    } else {
      throw new HttpErrors[401](
        'Datos ingresados no son validos, intente nuevamente.',
      );
    }
  }
  //Si se quiere proteger todo el crud de la entidad, el authenticate se pone encima de la clase
  //Si se quiere proteger con excepciones, entoces se pone .skip()
  //El registro de asesores solo se le permite a los administradores del negocio
  //Metodo del BackEnd para ejecutar el Login Asesor
  @authenticate('admin')
  @post('/register-asesores')
  @response(200, {
    description: 'Post protegido para agregar asesores al sistema',
    content: {'application/json': {schema: getModelSchemaRef(Asesor)}},
  })
  async createAsesor(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {
            title: 'NewAsesor',
            exclude: ['id'],
          }),
        },
      },
    })
    persona: Omit<Asesor, 'id'>,
  ): Promise<Asesor> {
    //Se hace uso del servicio de autenticacion
    let clave = this.servicioAutenticacion.GenerarClaveAleatoria();
    let clave_encriptada = this.servicioAutenticacion.EncriptarClave(clave);

    //Se encripta la clave para enviarla a la base de Datos
    persona.clave = clave_encriptada;
    persona.tipo_persona = 'asesor';
    let advisor = await this.asesorRepository.create(persona);

    //Notificacion por correo al usuario
    let destino = persona.email;
    let asunto = 'Bienvenido a la plataforma Smart Vehicle';
    let contenido = `Hola ${advisor.nombre_completo}, su usuario para ingresar a la plataforma Smart Vehicle es
    ${advisor.email} y su clave de acceso es: ${clave}`;

    //Hacemos fetch para consumir recursos de servicios externos.
    fetch(
      `${Llaves.urlNotificaciones}/enviar-correo?correo-destino=${destino}&asunto=${asunto}&contenido=${contenido}`,
    ).then((data: any) => {
      console.log(data);
    });

    return advisor;
  }

  //Metodo del BackEnd para ejecutar el modificaciones en el Asesor
  @patch('/modificar-asesor')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async modificar_asesor(
    @requestBody() asesor: Asesor
    ): Promise<void> {
    let advisor = await this.asesorRepository.findOne({
      where: {nombre_completo: asesor.nombre_completo},
    });
    await this.asesorRepository
      .updateById(advisor?.id, asesor)
      .then(() => {
        console.log('Se ha actualizado el registro satisfactoriamente');
      })
      .catch(() => {
        console.log('No se ha encontrado el registro a actualizar');
      });
  }

  @get('/asesores/count')
  @response(200, {
    description: 'Asesor model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(@param.where(Asesor) where?: Where<Asesor>): Promise<Count> {
    return this.asesorRepository.count(where);
  }

  //Metodo para obtener la informacion de las personas ingresadas en el sistema
  @get('/asesores')
  @response(200, {
    description: 'Array of Asesor model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Asesor, {includeRelations: true}),
        },
      },
    },
  })
  async find(@param.filter(Asesor) filter?: Filter<Asesor>): Promise<Asesor[]> {
    return this.asesorRepository.find(filter);
  }

  @patch('/asesores')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
    @param.where(Asesor) where?: Where<Asesor>,
  ): Promise<Count> {
    return this.asesorRepository.updateAll(asesor, where);
  }

  @get('/asesores/{id}')
  @response(200, {
    description: 'Asesor model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Asesor, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Asesor, {exclude: 'where'})
    filter?: FilterExcludingWhere<Asesor>,
  ): Promise<Asesor> {
    return this.asesorRepository.findById(id, filter);
  }

  @patch('/asesores/{id}')
  @response(204, {
    description: 'Asesor PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Asesor, {partial: true}),
        },
      },
    })
    asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.updateById(id, asesor);
  }

  @put('/asesores/{id}')
  @response(204, {
    description: 'Asesor PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() asesor: Asesor,
  ): Promise<void> {
    await this.asesorRepository.replaceById(id, asesor);
  }

  @del('/asesores/{id}')
  @response(204, {
    description: 'Asesor DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.asesorRepository.deleteById(id);
  }
}
