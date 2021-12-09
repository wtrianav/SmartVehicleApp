import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '../administration/admin/admin-home/admin-home.component';
import {ClientRequestComponent} from './client-request/client-request.component';
import { ListRequestComponent } from './list-request/list-request.component';

const routes: Routes = [
  {
    path: "client-request",
    component: ClientRequestComponent
  },
  {
    path: "list-request",
    component: ListRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
