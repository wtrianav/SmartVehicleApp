import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredentialsModel } from 'src/app/models/user-credentials';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup = new FormGroup({});

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      username: [""]
    })
  }

  RecoverPass() {
    if(this.form.invalid) {
      console.log("No valido");
      // throw new Error;
    } else {
      let modelo = new UserCredentialsModel();
      modelo.username = this.GetForm.username.value;
      this.securityService.RecoverPassword(modelo).subscribe({
        next: (data:any) => {
          data.clave = "";
          console.log(data);
        },
        error: (error:any) => {
        }
      })
    }
  }

  get GetForm() {
    return this.form.controls;
  }

}
