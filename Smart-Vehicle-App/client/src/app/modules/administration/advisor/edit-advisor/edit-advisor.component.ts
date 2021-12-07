import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {GeneralData} from 'src/app/config/general-data';
import {AdvisorCredentialsRegisterModel} from 'src/app/models/user-credentials';
import {PersonService} from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-advisor',
  templateUrl: './edit-advisor.component.html',
  styleUrls: ['./edit-advisor.component.css']
})
export class EditAdvisorComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  siteKey: string = GeneralData.CODE_CAPTCHA;
  id: string = "";

  constructor(private formBuilder: FormBuilder, private personService: PersonService, private router: Router,
    private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id=this.route.snapshot.params["id"];
    this.BuscarAsesor();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      numero_documento: ['', [Validators.required, Validators.minLength(4)]],
      nombre_completo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      recaptcha: ["", Validators.required],
    });
  }

  BuscarAsesor() {
    this.personService.ObtenerRegistroPorId(this.id).subscribe((datos: any) => {
      this.form.controls["id"].setValue(this.id);
      this.form.controls["numero_documento"].setValue(datos.numero_documento);
      this.form.controls["nombre_completo"].setValue(datos.nombre_completo);
      this.form.controls["email"].setValue(datos.email);
      this.form.controls["telefono"].setValue(datos.telefono);
    })

  }

  EditarAsesor() {
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
      modelo.id = this.id;
      this.personService.ActualizarAsesor(modelo).subscribe({
        next: (data: any) => {
          console.log(data);
          this.router.navigate(["/administration/advisor/list-advisor"]);
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
