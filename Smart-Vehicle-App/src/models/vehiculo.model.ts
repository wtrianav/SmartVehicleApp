import {Entity, hasMany, model, property} from '@loopback/repository';
import {Solicitud} from './solicitud.model';

@model()
export class Vehiculo extends Entity {
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
  tipo_vehiculo: string;

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
    required: true,
  })
  anio_modelo: string;

  @property({
    type: 'string',
    required: true,
  })
  placa: string;

  @property({
    type: 'number',
    required: true,
  })
  valor_venta: string;

  @property({
    type: 'number',
    required: true,
  })
  valor_alquiler: string;

  @property({
    type: 'string',
  })
  imagen: string;

  @property({
    type: 'string',
  })
  descripcion: string;

  @hasMany(() => Solicitud)
  solicitudes: Solicitud[];

  constructor(data?: Partial<Vehiculo>) {
    super(data);
  }
}

export interface VehiculoRelations {
  // describe navigational properties here
}

export type VehiculoWithRelations = Vehiculo & VehiculoRelations;
