import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehiculo } from 'src/app/models/vehiculo.model'
import { Subscription } from 'rxjs';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerState } from '@ng-bootstrap/ng-bootstrap';
import { SecurityService } from 'src/app/services/security.service';
import { UserLoginSesionModel } from 'src/app/models/user-credentials';
import { RequestModelClass } from 'src/app/models/solicitud.model';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';
import { AdvisorService } from 'src/app/services/advisor.service';


@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.css']
})
export class ClientRequestComponent implements OnInit {

  valor: any; //Propiedad del valor ya sea de alquiler o compra
  fecha: boolean = true; //Propiedad condicional para determinar que fecha mostrar en el frontend
  vehiculo = new Vehiculo(); //Modelo para obtener la informacion del vehiculo proveniente de la lista de tarjetas de vehiculos
  form: FormGroup = new FormGroup({}); //Formulario para mandar info
  usuario = new UserLoginSesionModel();
  valor_alquiler: any;
  days: number = 1; //Propiedad que ayuda a calcular el valor del alquiler por dias
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;
  asesorId?: string;

  range = new FormGroup({
    fecha_salida: new FormControl(),
    fecha_retorno: new FormControl(),
  });

  formulario = new FormGroup({
    fecha_venta: new FormControl(),
  })

  suscripcion: Subscription = new Subscription();//Propiedad subscripcion para obtener los datos almacenados en el localstorage

  //Se utiliza el servicio de vehiculos para obtener los datos del vehiculo seleccionado
  constructor(
    private vehicleService: VehicleService,
    private securityService: SecurityService,
    private requestService: RequestService,
    private advisorService: AdvisorService,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar,
    public formatter: NgbDateParserFormatter,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
  }

  ngOnInit(): void {
    //Se recibe la informacion proveniente de la vista de tarjetas de los vehiculos, y luego se crea el formulario reactivo
    this.suscripcion = this.vehicleService.ObtenerDatosVehiculos().subscribe((datos: Vehiculo) => {
      this.vehiculo = datos;
      console.log(this.vehiculo);

      this.CreateForm(this.vehiculo);
    });
    //Seo obtiene informacion del usuario desde el localstorage para hacer la solicitud
    this.suscripcion = this.securityService.ObtenerDatosUsuarioEnSesion().subscribe((datos: any) => {
      this.usuario = datos;
      console.log(this.usuario);
    })
    //Se busca el asesor para asociarlo a la solicitud, se obtiene de manera aleatoria consultando el backend
    this.advisorService.BuscarAsesor().subscribe((data : any) => {
      this.asesorId = data.id;
      console.log(data);
    })
    

  }

  CreateForm(_data: any) {
    //Se consulta el tipo de solicitud para saber que tipo de valor y que fecha se va a colocar en el formulario
    if (_data.solicitud === 'Compra') {
      this.valor = _data.valor_venta;
      this.fecha = true;
    } else {
      this.valor = _data.valor_alquiler;
      this.fecha = false;
    }
    this.form = this.formBuilder.group({
      marca: [_data.marca, [Validators.required]],
      modelo: [_data.modelo],
      anio_modelo: [_data.anio_modelo],
      valor: [`$${this.valor}`],
      departamento: [""],
      ciudad: [""],
      direccion: [""],
      fecha_venta: [""],
      fecha_salida: [""],
      fecha_retorno: [""],
    });

  }

  //Metodo para obtener los datos que han sido ingresado al formulario
  get GetForm() {
    return this.form.controls;
  }

  EnviarSolicitud() {
    if (this.form.invalid) {
      console.log("No valido");
    } else {
      
      let modelo = new RequestModelClass();
      modelo.solicitante = this.usuario.nombre;
      modelo.personaId = this.usuario.id;
      modelo.vehiculoId = this.vehiculo.id;
      modelo.marca = this.vehiculo.marca;
      modelo.modelo = this.vehiculo.modelo;
      
      modelo.tipo_solicitud = this.vehiculo.solicitud;
      //El estado de la solicitud siempre queda pendiente hasta que un asesor la revise
      modelo.estado = "Pendiente";
      if (this.vehiculo.solicitud === 'Alquiler') {
        modelo.fecha_retorno = moment(this.form.controls['fecha_retorno'].value).format("DD/MM/YYYY");
        modelo.fecha_salida = moment(this.form.controls['fecha_salida'].value).format("DD/MM/YYYY");    
        // modelo.fecha_retorno = fecha_retorno.toLocaleDateString();
        // modelo.fecha_salida = fecha_salida.toLocaleDateString();
        modelo.fecha_venta = "";
        modelo.valor = parseInt(this.valor_alquiler);
      } else {
        modelo.fecha_venta = moment(this.form.controls['fecha_venta'].value).format("DD/MM/YYYY");
        modelo.valor = parseInt(this.valor);
        modelo.fecha_salida = "";
        modelo.fecha_retorno = "";
      }
      modelo.departamento = this.form.controls['departamento'].value;
      modelo.ciudad = this.form.controls['ciudad'].value;
      modelo.direccion = this.form.controls['direccion'].value;

      

      modelo.asesorId = this.asesorId;
      console.log(modelo);
      
      this.requestService.SendRequest(modelo).subscribe(() => {
        let snackbar = this._snackBar.open("Solicitud Enviada", "Aceptar");
        snackbar.afterDismissed().subscribe(() => {
          console.log("El snackbar fue cerrado");
          // window.location.reload();
          this.router.navigateByUrl('/request/list-request');
        })
      })

    }
  }

  AlSeleccionarFecha(){
    let a = moment(this.form.controls['fecha_salida'].value);
    let b = moment(this.form.controls['fecha_retorno'].value);
    let dias = b.diff(a, 'days');
    this.valor_alquiler = this.valor * dias;
    console.log(moment(this.form.controls['fecha_salida'].value).format("DD/MM/YYYY"));
    this.form.controls['valor'].setValue(`$${this.valor_alquiler}`);
  }

}
