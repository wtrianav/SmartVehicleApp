import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxCaptchaModule } from 'ngx-captcha';


import { SecurityRoutingModule } from './security-routing.module';
import { LoginComponent } from './login/login.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { CloseSessionComponent } from './close-session/close-session.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    CloseSessionComponent,
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
