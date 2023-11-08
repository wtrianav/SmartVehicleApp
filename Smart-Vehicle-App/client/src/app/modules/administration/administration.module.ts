import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';
import { ClientNoRegisteredComponent, ClientRegisteredComponent, CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { AdvisorCreatedComponent, CreateAdvisorComponent } from './advisor/create-advisor/create-advisor.component';
import { EditAdvisorComponent } from './advisor/edit-advisor/edit-advisor.component';
import { DeleteAdvisorComponent, ListAdvisorComponent } from './advisor/list-advisor/list-advisor.component';
import { ListVehicleComponent } from './vehicle/list-vehicle/list-vehicle.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditVehicleComponent } from './vehicle/edit-vehicle/edit-vehicle.component';
import { DeleteVehicleComponent, TableVehicleComponent } from './vehicle/table-vehicle/table-vehicle.component';
import { MaterialModule } from 'src/app/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { AdvisorHomeComponent } from './advisor/advisor-home/advisor-home.component';

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
    EditVehicleComponent,
    TableVehicleComponent,
    DeleteVehicleComponent,
    AdminHomeComponent,
    AdvisorCreatedComponent,
    ClientRegisteredComponent,
    ClientNoRegisteredComponent,
    AdvisorHomeComponent
  ],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule,
    NgbModule,
    MaterialModule,
    MatNativeDateModule,
  ]
})
export class AdministrationModule { }
