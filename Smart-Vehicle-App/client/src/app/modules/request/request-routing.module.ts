import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientRequestComponent } from './client-request/client-request.component';

const routes: Routes = [
  {
    path: "client-request",
    component: ClientRequestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RequestRoutingModule { }
