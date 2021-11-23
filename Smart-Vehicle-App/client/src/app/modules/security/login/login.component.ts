import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentialsModel } from 'src/app/models/user-credentials';
import {MD5} from 'crypto-js';
import { SecurityService } from 'src/app/services/security.service';

export let Token: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  session: Boolean = false;
  scooterimg: string;
  form: FormGroup = new FormGroup({});


  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
  ) {
    this.scooterimg = "assets/images/background1.jpg";
  }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      username: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(8)]]
    })
  }

  Login() {
    console.log("Se metio aca");
    if(this.form.invalid){
      console.log("No valido");
    }
    else {
      let modelo = new UserCredentialsModel();
      modelo.username = this.GetForm.username.value;
      modelo.password = MD5(this.GetForm.password.value).toString();
      console.log(modelo.password);
      this.securityService.Login(modelo).subscribe({
        next: (data:any) => {
          console.log(data);
          Token = data.token;
          // console.log(data.token);
        },
        error: (error:any) => {
          // console.log(error);
        }
      })
    }
  }

  get GetForm() {
    return this.form.controls;
  }

}
