import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from '../administration/admin/admin-home/admin-home.component';
import { AdvisorListRequestComponent } from './advisor-list-request/advisor-list-request.component';
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
  },
  {
    path: "advisor-list-request",
    component: AdvisorListRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
