import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { ClientRequestComponent } from './client-request/client-request.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ListRequestComponent } from './list-request/list-request.component';


@NgModule({
  declarations: [
    ClientRequestComponent,
    ListRequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class RequestModule { }
