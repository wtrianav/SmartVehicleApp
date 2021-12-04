import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateAdvisorComponent } from './advisor/create-advisor/create-advisor.component';
import { EditAdvisorComponent } from './advisor/edit-advisor/edit-advisor.component';
import { DeleteAdvisorComponent } from './advisor/delete-advisor/delete-advisor.component';
import { ListAdvisorComponent } from './advisor/list-advisor/list-advisor.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditVehicleComponent } from './vehicle/edit-vehicle/edit-vehicle.component';

@NgModule({
  declarations: [
    CreateClientComponent,
    EditClientComponent,
    DeleteClientComponent,
    ListClientComponent,
    CreateAdvisorComponent,
    EditAdvisorComponent,
    DeleteAdvisorComponent,
    ListAdvisorComponent,
    ListVehicleComponent,
    ListVehicleComponent,
    EditVehicleComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgbModule
  ]
})
export class AdministrationModule { }
