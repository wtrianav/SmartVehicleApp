import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralData } from 'src/app/config/general-data';
import { AdvisorCredentialsRegisterModel } from 'src/app/models/user-credentials';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-advisor',
  templateUrl: './create-advisor.component.html',
  styleUrls: ['./create-advisor.component.css']
})
export class CreateAdvisorComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  siteKey: string = GeneralData.CODE_CAPTCHA;

  constructor(private formBuilder: FormBuilder, private securityService: SecurityService) {}

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      numero_documento: ['', [Validators.required, Validators.minLength(4)]],
      nombre_completo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ["", Validators.required],
    });
  }

  RegisterAdvisor() {
    console.log("Está entrando");
    if (this.form.invalid) {
      console.log('Formulario no válido');
    } else {
      let modelo = new AdvisorCredentialsRegisterModel();
      modelo.nro_documento = this.GetForm.numero_documento.value;
      modelo.nombre_completo = this.GetForm.nombre_completo.value;
      modelo.email = this.GetForm.email.value;
      modelo.telefono = this.GetForm.telefono.value;
      modelo.tipo_persona = 'asesor';
      this.securityService.RegisterAsesor(modelo).subscribe({
        next: (data: any) => {
          console.log(data);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  get GetForm() {
    return this.form.controls;
  }
}
