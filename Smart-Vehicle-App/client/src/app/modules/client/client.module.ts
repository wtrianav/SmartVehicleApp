import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { SolicitarVehiculoComponent } from './solicitar-vehiculo/solicitar-vehiculo.component';

@NgModule({
  declarations: [
    SolicitarVehiculoComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
  ]
})
export class ClientModule { }
