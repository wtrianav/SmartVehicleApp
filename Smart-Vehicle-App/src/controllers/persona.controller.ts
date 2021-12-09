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
import {CambioClave, Credenciales, CredencialesRecuperarClave, FormularioContacto, NotificacionCorreo, Persona} from '../models';
import {PersonaRepository} from '../repositories';
import {AutenticacionService, NotificacionService} from '../services';
//Hay que importar el fetch para hacer uso de el al mandar notificaciones por correo
const fetch = require('node-fetch');

export class PersonaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
    @service(AutenticacionService)
    public servicioAutenticacion: AutenticacionService,
    @service(NotificacionService)
    public servicioNotificacion: NotificacionService
  ) { }

  //Metodo para realizar el login de la persona a la plataforma.
  @post('/login')
  @response(200, {
    description: 'Login de personas a la plataforma',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async identificarPersona(
    @requestBody() credenciales: Credenciales
  ) {

    let person = await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave,);
    if (person) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(person);
      return {
        id: person.id,
        nombre: person.nombre_completo,
        email: person.email,
        role: person.tipo_persona,
        token: token
      }
    } else {
      throw new HttpErrors[401]('Datos ingresados no son validos, intente nuevamente.')
    }
  }

  @post('/enviar-formulario')
  @response(200, {
    description: 'Envio de Formulario',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async enviarformulario(
    @requestBody() formulariocontacto : FormularioContacto,
  ) {
    let datos = new NotificacionCorreo(
      {
        destinatario: Llaves.correoContacto,
        asunto: `Nuevo comentario de ${formulariocontacto.nombre}`,
        contenido: `<td class="esd-stripe" align="center">
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
                                                        <p style="color: #999999;">Saludos,<br>Este correo electrónico se envia desde ${formulariocontacto.email}<br><br>Comentarios:<br><br>${formulariocontacto.comentario}</p>
                                                        <p style="color: #999999;"><br></p>
                                                        <p style="color: #999999;">Atentamente<br>${formulariocontacto.nombre}</p>
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
      </td>`
      }
    )
    this.servicioNotificacion.NotificarPorCorreo(datos);
  }

  //Metodo para registrar personas a la plataforma
  @post('/personas')
  @response(200, {
    description: 'Persona model instance',
    content: {'application/json': {schema: getModelSchemaRef(Persona)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {
            title: 'NewPersona',

          }),
        },
      },
    })
    persona: Persona,
  ): Promise<Persona> {
    //Se hace uso del servicio de autenticacion
    let clave = this.servicioAutenticacion.GenerarClaveAleatoria();
    let clave_encriptada = this.servicioAutenticacion.EncriptarClave(clave);
    //Guardar la clave encriptada para meterla en la base de datos
    persona.clave = clave_encriptada;
    let person = await this.personaRepository.create(persona);

    //Notificacion por correo al usuario
    let datos = new NotificacionCorreo(
      {
        destinatario: persona.email,
        asunto: Llaves.asuntoRegistroCliente,
        contenido: `

        `
      }
    )
    this.servicioNotificacion.NotificarPorCorreo(datos);
    return person;
  }

  //Metodo para cambiar clave
  @post('/cambiar-clave')
  @response(200, {
    description: 'Cambio de clave de persona',
    content: {'application/json': {schema: getModelSchemaRef(CambioClave)}},
  })
  async cambiarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambioClave, {
            title: 'Cambio de clave'
          }),
        },
      },
    })
    credencialesClave: CambioClave,
  ): Promise<Boolean> {
    let respuesta = await this.servicioAutenticacion.CambiarClave(credencialesClave);
    return respuesta;
  }

  //Metodo para recuperar la clave
  @post('/recuperar-clave')
  @response(200, {
    description: 'Cambio de clave de clientes',
    content: {
      'application/json': {
        schema: {
          type: 'string'
        }
      }
    },
  })
  async recuperarClaveCliente(
    @requestBody() credenciales: CredencialesRecuperarClave
  ): Promise<Persona | null> {
    let clave = this.servicioAutenticacion.GenerarClaveAleatoria();
    let usuario = await this.servicioAutenticacion.RecuperarClave(credenciales.email, clave);
    console.log("Todo Bien");
    if (usuario) {
      let datos = new NotificacionCorreo(
        {
          destinatario: usuario.email,
          asunto: Llaves.asuntoRecuperarContraseña,
          contenido: `Hola ${usuario.nombre_completo}, se ha generado una nueva contraseña para su usuario
            ${usuario.email} y es: ${clave}`
        }
      )
      this.servicioNotificacion.NotificarPorCorreo(datos);
    }
    return usuario;
  }

  //Metodo del BackEnd para ejecutar el modificaciones en la persona
  @patch('/modificar')
  @response(200, {
    description: 'Asesor PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async modificar_asesor(
    @requestBody() persona: Persona
  ): Promise<void> {
    let advisor = await this.personaRepository.findOne({
      where: {nombre_completo: persona.nombre_completo},
    });
    await this.personaRepository
      .updateById(advisor?.id, persona)
      .then(() => {
        console.log('Se ha actualizado el registro satisfactoriamente');
      })
      .catch(() => {
        console.log('No se ha encontrado el registro a actualizar');
      });
  }

  @get('/personas/count')
  @response(200, {
    description: 'Persona model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.count(where);
  }

  @get('/personas')
  @response(200, {
    description: 'Array of Persona model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Persona, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Persona) filter?: Filter<Persona>,
  ): Promise<Persona[]> {
    return this.personaRepository.find(filter);
  }

  @patch('/personas')
  @response(200, {
    description: 'Persona PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
    @param.where(Persona) where?: Where<Persona>,
  ): Promise<Count> {
    return this.personaRepository.updateAll(persona, where);
  }

  @get('/personas/{id}')
  @response(200, {
    description: 'Persona model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Persona, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Persona, {exclude: 'where'}) filter?: FilterExcludingWhere<Persona>
  ): Promise<Persona> {
    return this.personaRepository.findById(id, filter);
  }

  @patch('/personas/{id}')
  @response(204, {
    description: 'Persona PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Persona, {partial: true}),
        },
      },
    })
    persona: Persona,
  ): Promise<void> {
    await this.personaRepository.updateById(id, persona);
  }

  @put('/personas/{id}')
  @response(204, {
    description: 'Persona PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() persona: Persona,
  ): Promise<void> {
    await this.personaRepository.replaceById(id, persona);
  }

  @del('/personas/{id}')
  @response(204, {
    description: 'Persona DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.personaRepository.deleteById(id);
  }
}
