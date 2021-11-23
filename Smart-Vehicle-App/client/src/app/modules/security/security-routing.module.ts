import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SolicitarVehiculoComponent } from '../client/solicitar-vehiculo/solicitar-vehiculo.component';
import { CreateAdvisorComponent } from './advisor/create-advisor/create-advisor.component';
import { DeleteAdvisorComponent } from './advisor/delete-advisor/delete-advisor.component';
import { EditAdvisorComponent } from './advisor/edit-advisor/edit-advisor.component';
import { ListAdvisorComponent } from './advisor/list-advisor/list-advisor.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'client/create-client',
    component: CreateClientComponent
  },
  {
    path: 'edit-client',
    component: EditClientComponent
  },
  {
    path: 'delete-client',
    component: DeleteClientComponent
  },
  {
    path: 'list-client',
    component: ListClientComponent
  },
  {
    path: 'advisor/create-advisor',
    component: CreateAdvisorComponent
  },
  {
    path: 'edit-advisor',
    component: EditAdvisorComponent
  },
  {
    path: 'delete-advisor',
    component: DeleteAdvisorComponent
  },
  {
    path: 'list-advisor',
    component: ListAdvisorComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecurityRoutingModule { }
