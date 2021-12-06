import {Model, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class FormularioContacto extends Model {
  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'string',
    required: true,
  })
  comentario: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<FormularioContacto>) {
    super(data);
  }
}

export interface FormularioContactoRelations {
  // describe navigational properties here
}

export type FormularioContactoWithRelations = FormularioContacto & FormularioContactoRelations;
