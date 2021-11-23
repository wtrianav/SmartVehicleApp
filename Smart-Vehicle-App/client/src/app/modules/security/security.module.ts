import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';


import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { CreateClientComponent } from './client/create-client/create-client.component';
import { EditClientComponent } from './client/edit-client/edit-client.component';
import { DeleteClientComponent } from './client/delete-client/delete-client.component';
import { ListClientComponent } from './client/list-client/list-client.component';
import { CreateAdvisorComponent } from './advisor/create-advisor/create-advisor.component';
import { EditAdvisorComponent } from './advisor/edit-advisor/edit-advisor.component';
import { DeleteAdvisorComponent } from './advisor/delete-advisor/delete-advisor.component';
import { ListAdvisorComponent } from './advisor/list-advisor/list-advisor.component';
import { SolicitarVehiculoComponent } from '../client/solicitar-vehiculo/solicitar-vehiculo.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from 'src/app/auth-interceptor.service';


@NgModule({
  declarations: [
    LoginComponent,
    CreateClientComponent,
    EditClientComponent,
    DeleteClientComponent,
    ListClientComponent,
    CreateAdvisorComponent,
    EditAdvisorComponent,
    DeleteAdvisorComponent,
    ListAdvisorComponent,
  ],
  imports: [
    CommonModule,
    SecurityRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ], 
  providers: [
    
  ]
})
export class SecurityModule { }