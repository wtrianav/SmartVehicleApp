import { authenticate } from '@loopback/authentication';
import { service } from '@loopback/core';
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
import { Llaves } from '../config/llaves';
import {Cliente, Credenciales} from '../models';
import {ClienteRepository} from '../repositories';
import { AutenticacionService } from '../services';
//Hay que importar el fetch para hacer uso de el al mandar notificaciones por correo
const fetch = require('node-fetch');

export class ClienteController {
  constructor(
    @repository(ClienteRepository)
    public clienteRepository : ClienteRepository,
    @service(AutenticacionService)
    public servicioAutenticacion : AutenticacionService,
  ) {}

  //Metodo del BackEnd para ejecutar el Login Cliente
  //No se requiere autenticacion en esta etapa
  @post('/login-cliente')
  @response(200, {
    description: 'Login de clientes a la plataforma',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async identificarCliente(
    @requestBody() credenciales: Credenciales
  ) {
    let person = await this.servicioAutenticacion.IdentificarPersona(credenciales.usuario, credenciales.clave, 'cliente');
    if (person) {
      let token = this.servicioAutenticacion.GenerarTokenJWT(person);
      return {
        datos: {
          nombre: person.nombre_completo,
          email: person.email,
          role: "cliente"
        },
        token: token
      }
    } else {
      throw new HttpErrors[401]('Datos ingresados no son validos, intente nuevamente.')
    }
  }

  //Metodo post para registrar cliente a la plataforma Smart Vehicle
  //No se requiere autenticacion en esta etapa
  @post('/register-clientes')
  @response(200, {
    description: 'Registro de clientes a la plataforma Smart Vehicle',
    content: {'application/json': {schema: getModelSchemaRef(Cliente)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {
            title: 'NewCliente',
            exclude: ['id'],
          }),
        },
      },
    })
    cliente: Omit<Cliente, 'id'>,
  ): Promise<Cliente> {
    //Se hace uso del servicio de autenticacion
    let clave = this.servicioAutenticacion.GenerarClaveAleatoria();
    let clave_encriptada = this.servicioAutenticacion.EncriptarClave(clave);
    //Guardar la clave encriptada para meterla en la base de datos
    cliente.clave = clave_encriptada;
    cliente.tipo_persona = "cliente";
    let client = await this.clienteRepository.create(cliente);

    //Notificacion por correo al usuario
    let destino = cliente.email;
    let asunto = 'Bienvenido a la plataforma Smart Vehicle';
    let contenido = `Hola ${cliente.nombre_completo}, su usuario para ingresar a la plataforma Smart Vehicle es
    ${cliente.email} y su clave de acceso es: ${clave}`;

    //Hacemos fetch para consumir recursos de servicios externos.
    fetch(`${Llaves.urlNotificaciones}/enviar-correo?correo-destino=${destino}&asunto=${asunto}&contenido=${contenido}`)
    .then((data:any) => {
      console.log(data);
    });
    return client;
  }


  //Metodo del BackEnd para ejecutar el modificaciones en el Asesor
  @patch('/recuperar-contraseña-cliente')
  @response(200, {
    description: 'Metodo para recuperar contraseña del cliente',
    content: {'application/json': {schema: CountSchema}},
  })
  async modificar_asesor(
    @requestBody() cliente: Cliente
    ): Promise<Boolean> {
    let client = await this.clienteRepository.findOne({
      where: {email: cliente.email},
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

  @post('/cambiar-clave-cliente')
  @response(200, {
    description: 'Cambio de clave de clientes',
    content: {'applicatio/json': {schema: getModelSchemaRef(Credenciales)}},
  })
  async cambiarClaveCliente(
    
  )


  @get('/clientes/count')
  @response(200, {
    description: 'Cliente model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.count(where);
  }

  @get('/clientes')
  @response(200, {
    description: 'Array of Cliente model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Cliente, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Cliente) filter?: Filter<Cliente>,
  ): Promise<Cliente[]> {
    return this.clienteRepository.find(filter);
  }

  @patch('/clientes')
  @response(200, {
    description: 'Cliente PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
    @param.where(Cliente) where?: Where<Cliente>,
  ): Promise<Count> {
    return this.clienteRepository.updateAll(cliente, where);
  }

  @get('/clientes/{id}')
  @response(200, {
    description: 'Cliente model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Cliente, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Cliente, {exclude: 'where'}) filter?: FilterExcludingWhere<Cliente>
  ): Promise<Cliente> {
    return this.clienteRepository.findById(id, filter);
  }

  @patch('/clientes/{id}')
  @response(204, {
    description: 'Cliente PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Cliente, {partial: true}),
        },
      },
    })
    cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.updateById(id, cliente);
  }

  @put('/clientes/{id}')
  @response(204, {
    description: 'Cliente PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() cliente: Cliente,
  ): Promise<void> {
    await this.clienteRepository.replaceById(id, cliente);
  }

  @del('/clientes/{id}')
  @response(204, {
    description: 'Cliente DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.clienteRepository.deleteById(id);
  }
}
