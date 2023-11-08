import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GeneralData } from 'src/app/config/general-data';
import { AdvisorCredentialsRegisterModel } from 'src/app/models/user-credentials';
import { AdvisorService } from 'src/app/services/advisor.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-advisor',
  templateUrl: './create-advisor.component.html',
  styleUrls: ['./create-advisor.component.css']
})
export class CreateAdvisorComponent implements OnInit {
  form: FormGroup = new FormGroup({});

  siteKey: string = GeneralData.CODE_CAPTCHA;

  constructor(private formBuilder: FormBuilder, 
    private advisorService: AdvisorService,
    private dialog: MatDialog,
    ) {}

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      numero_documento: ['', [Validators.required, Validators.minLength(7)]],
      nombre_completo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ["", Validators.required],
    });
  }

  AbrirDialogo() {
    this.dialog.open(AdvisorCreatedComponent);
  }

  RegisterAdvisor() {
    if (this.form.invalid) {
      console.log('Formulario no válido');
    } else {
      let modelo = new AdvisorCredentialsRegisterModel();
      modelo.nro_documento = this.GetForm.numero_documento.value;
      modelo.nombre_completo = this.GetForm.nombre_completo.value;
      modelo.email = this.GetForm.email.value;
      modelo.telefono = this.GetForm.telefono.value;
      modelo.tipo_persona = 'asesor';
      this.advisorService.CrearAsesor(modelo).subscribe({
        next: (data: any) => {
          this.AbrirDialogo();
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

@Component({
  selector: 'app-advisor-created',
  templateUrl: './advisor-created.component.html',
})

export class AdvisorCreatedComponent {}