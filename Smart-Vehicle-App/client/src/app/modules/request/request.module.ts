import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RequestRoutingModule } from './request-routing.module';
import { ClientRequestComponent } from './client-request/client-request.component';
import { ListRequestComponent } from './list-request/list-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from 'src/app/material/material.module';
import { MatNativeDateModule } from '@angular/material/core';
import { AdvisorListRequestComponent } from './advisor-list-request/advisor-list-request.component';



@NgModule({
  declarations: [
    ClientRequestComponent,
    ListRequestComponent,
    AdvisorListRequestComponent
  ],
  imports: [
    CommonModule,
    RequestRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    MaterialModule,
    MatNativeDateModule,
  ],
  bootstrap: [ClientRequestComponent]
})
export class RequestModule { }
