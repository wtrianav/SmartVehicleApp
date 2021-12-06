import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitud, SolicitudRelations, Vehiculo, Codeudor, Persona} from '../models';
import {VehiculoRepository} from './vehiculo.repository';
import {CodeudorRepository} from './codeudor.repository';
import {PersonaRepository} from './persona.repository';

export class SolicitudRepository extends DefaultCrudRepository<
  Solicitud,
  typeof Solicitud.prototype.id,
  SolicitudRelations
> {


  public readonly vehiculo: BelongsToAccessor<Vehiculo, typeof Solicitud.prototype.id>;

  public readonly codeudor: BelongsToAccessor<Codeudor, typeof Solicitud.prototype.id>;

  public readonly persona: BelongsToAccessor<Persona, typeof Solicitud.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculoRepository') protected vehiculoRepositoryGetter: Getter<VehiculoRepository>, @repository.getter('CodeudorRepository') protected codeudorRepositoryGetter: Getter<CodeudorRepository>, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Solicitud, dataSource);
    this.persona = this.createBelongsToAccessorFor('persona', personaRepositoryGetter,);
    this.registerInclusionResolver('persona', this.persona.inclusionResolver);
    this.codeudor = this.createBelongsToAccessorFor('codeudor', codeudorRepositoryGetter,);
    this.registerInclusionResolver('codeudor', this.codeudor.inclusionResolver);
    this.vehiculo = this.createBelongsToAccessorFor('vehiculo', vehiculoRepositoryGetter,);
    this.registerInclusionResolver('vehiculo', this.vehiculo.inclusionResolver);
  }
}
