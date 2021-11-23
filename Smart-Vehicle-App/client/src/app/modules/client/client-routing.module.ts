import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarVehiculoComponent } from './solicitar-vehiculo/solicitar-vehiculo.component';

const routes: Routes = [
  {
    path: 'solicitar-vehiculo',
    component: SolicitarVehiculoComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
