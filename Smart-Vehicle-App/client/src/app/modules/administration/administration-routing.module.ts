import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdvisorHomeComponent } from './advisor/advisor-home/advisor-home.component';
import { CreateAdvisorComponent } from './advisor/create-advisor/create-advisor.component';
import { EditAdvisorComponent } from './advisor/edit-advisor/edit-advisor.component';
import { ListAdvisorComponent } from './advisor/list-advisor/list-advisor.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateVehicleComponent } from './vehicle/create-vehicle/create-vehicle.component';
import {EditVehicleComponent} from './vehicle/edit-vehicle/edit-vehicle.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';
import {TableVehicleComponent} from './vehicle/table-vehicle/table-vehicle.component';

const routes: Routes = [
  {
    path: 'client/create-client',
    component: CreateClientComponent
  },
  {
    path: 'client/edit-client',
    component: EditClientComponent
  },
  {
    path: 'client/delete-client',
    component: DeleteClientComponent
  },
  {
    path: 'client/list-client',
    component: ListClientComponent
  },
  {
    path: 'advisor/create-advisor',
    component: CreateAdvisorComponent
  },
  {
    path: 'advisor/edit-advisor/:id',
    component: EditAdvisorComponent
  },
  {
    path: 'advisor/list-advisor',
    component: ListAdvisorComponent
  },
  {
    path: 'vehicle/list-vehicle',
    component: ListVehicleComponent
  },
  {
    path: 'vehicle/create-vehicle',
    component: CreateVehicleComponent
  }
  ,{
    path: 'vehicle/edit-vehicle/:id',
    component: EditVehicleComponent
  }
  ,{
    path: 'vehicle/table-vehicle',
    component: TableVehicleComponent
  },
  {
    path: 'vehicle/table-vehicle/:id',
    component: TableVehicleComponent
  },
  {
    path: "admin/admin-home",
    component: AdminHomeComponent
  },
  {
    path: "advisor/advisor-home",
    component: AdvisorHomeComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministrationRoutingModule { }
