import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
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
  datos: any;
  seleccionado: string | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClienteService,
    private clienteService: ClienteService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.ConsultarDepartamentos();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      tipo_documento: ["",],
      numero_documento: ["", [Validators.required, Validators.minLength(7)]],
      nombre_completo: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email, Validators.minLength(5)]],
      departamento: ["",],
      ciudad: ["",],
      direccion: ["",],
      telefono: ["", [Validators.required, Validators.minLength(7)]],
      recaptcha: ["", Validators.required],
    })
  }

  Register() {
    if (this.form.invalid) {
      console.log("No valido");
    }
    else {
      console.log("Formato valido");
      let modelo = new ClientCredentialsRegisterModel();
      console.log(modelo);
      modelo.tipo_documento = this.GetForm.tipo_documento.value;
      modelo.nro_documento = this.GetForm.numero_documento.value;
      modelo.nombre_completo = this.GetForm.nombre_completo.value;
      modelo.email = this.GetForm.email.value;
      modelo.departamento = this.GetForm.departamento.value;
      modelo.ciudad = this.GetForm.ciudad.value;
      modelo.direccion = this.GetForm.direccion.value;
      modelo.telefono = this.GetForm.telefono.value;
      modelo.tipo_persona = "cliente";
      this.clientService.CrearCliente(modelo).subscribe({
        next: (data: any) => {
          if(data) { 
          this.dialog.open(ClientRegisteredComponent);
          } else {
            this.dialog.open(ClientNoRegisteredComponent);
          }
        },
        error: (error: any) => {
          console.log(console.error);
        }
      })
    }
  }

  ConsultarDepartamentos() {
    this.clienteService.ObtenerDepartamentos().subscribe({
      next: (data: any) => {
        this.datos = Object.values(data);
        console.log(this.datos);
      }, error: (error: any) => {
        console.log(error);
      }
    })
  }

  get GetForm() {
    return this.form.controls;
  }
}

@Component({
  selector: 'app-client-registered',
  templateUrl: './client-registered.component.html',
})
export class ClientRegisteredComponent implements OnInit {

  segundos: any = 3;

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    //Se crea un intervalo para mostrar el tiempo de redireccion a la pagina de login.
    const interval = setInterval(() => {
      this.segundos--;
      if (this.segundos === 0) {
        this.router.navigate(['/security/login']);
        clearInterval(interval);
        this.dialog.closeAll();
      }
    }, 1000);
  }
}

@Component({
  selector: 'app-client-no-registered',
  templateUrl: './client-no-registered.component.html',
})
export class ClientNoRegisteredComponent implements OnInit {

  segundos: any = 3;

  constructor(
    private dialog: MatDialog,
    private router: Router,
  ) { }

  ngOnInit() {
    //Se crea un intervalo para mostrar el tiempo de redireccion a la pagina de login.
    const interval = setInterval(() => {
      this.segundos--;
      if (this.segundos === 0) {
        this.router.navigate(['/security/login']);
        clearInterval(interval);
        this.dialog.closeAll();
      }
    }, 1000);
  }


}