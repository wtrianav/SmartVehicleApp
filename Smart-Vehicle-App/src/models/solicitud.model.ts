import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculo} from './vehiculo.model';
import {Codeudor} from './codeudor.model';
import {Persona} from './persona.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  solicitante: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'string',
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_solicitud: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
  })
  fecha_salida?: string;

  @property({
    type: 'string',
  })
  fecha_retorno?: string;

  @property({
    type: 'string',
  })
  fecha_venta?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
  })
  notas_asesor?: string;

  @property({
    type: 'string',
  })
  asesorId?: string;

  @belongsTo(() => Vehiculo)
  vehiculoId: string;

  @belongsTo(() => Codeudor)
  codeudorId: string;

  @belongsTo(() => Persona)
  personaId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
