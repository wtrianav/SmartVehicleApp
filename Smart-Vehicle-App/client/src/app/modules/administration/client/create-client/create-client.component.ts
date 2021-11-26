import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GeneralData } from 'src/app/config/general-data';
import { ClientCredentialsRegisterModel } from 'src/app/models/user-credentials';
import { ClienteService } from 'src/app/services/cliente.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.component.html',
  styleUrls: ['./create-client.component.css']
})
export class CreateClientComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  siteKey: string = GeneralData.CODE_CAPTCHA;
  urlDepartamento: string = GeneralData.API_DPTO;
  datos : any;
  seleccionado : string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private clienteService: ClienteService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.ConsultarDepartamentos();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      tipo_documento:["", ], 
      numero_documento: ["", [Validators.required,Validators.minLength(7)]],
      nombre_completo: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
      departamento: ["", ],
      ciudad: ["", ],
      direccion: ["", ],
      telefono: ["", [Validators.required,Validators.minLength(7)]],
      recaptcha: ["", Validators.required],
    })
  }

  Register() {
    if(this.form.invalid) {
      console.log("No valido");
    }
    else {
      console.log("Formato valido");
      let modelo = new ClientCredentialsRegisterModel();
      console.log(modelo);
      modelo.tipo_documento = this.GetForm.tipo_documento.value;
      modelo.numero_documento = this.GetForm.numero_documento.value;
      modelo.nombre_completo = this.GetForm.nombre_completo.value;
      modelo.email = this.GetForm.email.value;
      modelo.departamento = this.GetForm.departamento.value;
      modelo.ciudad = this.GetForm.ciudad.value;
      modelo.direccion = this.GetForm.direccion.value;
      modelo.telefono = this.GetForm.telefono.value;
      this.securityService.RegisterCliente(modelo).subscribe({
        next: (data:any) => {
          console.log(data);
        },
        error: (error:any) => {
          console.log(console.error);
        }
      })
    }
  }

  ConsultarDepartamentos() {
    this.clienteService.ObtenerDepartamentos().subscribe({
      next: (data : any) => {
        this.datos = Object.values(data);
        console.log(this.datos);
      }, error : (error : any) => {
        console.log(error);
      }
    })
  }

  get GetForm() {
    return this.form.controls;
  }
}
