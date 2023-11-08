import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralData } from 'src/app/config/general-data';
import { AdvisorCredentialsRegisterModel } from 'src/app/models/user-credentials';
import { AdvisorService } from 'src/app/services/advisor.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-edit-advisor',
  templateUrl: './edit-advisor.component.html',
  styleUrls: ['./edit-advisor.component.css']
})
export class EditAdvisorComponent implements OnInit {

  //Se declaran las propiedades a utilizar por el componente
  form: FormGroup = new FormGroup({}); //Se instancia el formulario a utilizar
  siteKey: string = GeneralData.CODE_CAPTCHA; //Se declara la llave a utilizar por el recaptcha
  id: string = ""; //Se inicializa vacio el id del asesor que se va a actualizar

  /*
  Se inyectan las dependencias del componente. 
  Es necesario usar el formbuilder para construir el formulario.
  Se hace uso del servicio de asesor para hacer las peticiones al backend
  Se hace uso del router para navegar entre URLs
  Se utiliza el activatedroute para obtener una copia del id que fue seleccionado para modificar el asesor
  */
  constructor(
    private formBuilder: FormBuilder,
    private advisorService: AdvisorService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  //Metodo que se ejecuta al inicializar el componente
  ngOnInit(): void {
    //Se obtiene el id proveniente de la URL 
    this.id = this.route.snapshot.params["id"];
    //Se crea el formulario
    this.CreateForm();
    //Se realiza la busqueda del asesor con el id previamente obtenido
    this.BuscarAsesor();
  }

  CreateForm() {
    //Se realiza la construccion del formulario con sus validaciones
    this.form = this.formBuilder.group({
      id: ['', Validators.required],
      numero_documento: ['', [Validators.required, Validators.minLength(7)]],
      nombre_completo: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.minLength(10)]],
      // recaptcha: ["", Validators.required],
    });
  }

  BuscarAsesor() {
    //Primero se realiza busqueda de la informacion del asesor en la BD por id
    this.advisorService.ObtenerAsesorPorId(this.id).subscribe((datos: any) => {
      //La informacion obtenida se inyecta en los campos del formulario para luego poder ser modificados
      this.form.controls["id"].setValue(this.id);
      this.form.controls["numero_documento"].setValue(datos.nro_documento);
      this.form.controls["nombre_completo"].setValue(datos.nombre_completo);
      this.form.controls["email"].setValue(datos.email);
      this.form.controls["telefono"].setValue(datos.telefono);
    })

  }

  EditarAsesor() {
    //Se valida el formulario
    if (this.form.invalid) {
      console.log('Formulario no válido');
    } else {
      //Se hace uso del modelo de asesor
      let modelo = new AdvisorCredentialsRegisterModel();
      modelo.nro_documento = this.GetForm.numero_documento.value;
      modelo.nombre_completo = this.GetForm.nombre_completo.value;
      modelo.email = this.GetForm.email.value;
      modelo.telefono = this.GetForm.telefono.value;
      modelo.tipo_persona = 'asesor';
      modelo.id = this.id;
      //Se inyecta la informacion del modelo en la base de datos con ayuda del servicio de asesor con la peticion http
      this.advisorService.ActualizarAsesor(modelo).subscribe({
        next: (data: any) => {
          //Se redirige a la pagina de la lista de asesore
          this.router.navigate(["/administration/advisor/list-advisor"]);
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }

  //Metodo para acortar el get form
  get GetForm() {
    return this.form.controls;
  }

}
