import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehiculo } from 'src/app/models/vehiculo.model'
import { Subscription } from 'rxjs';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepicker, NgbDatepickerConfig, NgbDatepickerState } from '@ng-bootstrap/ng-bootstrap';

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

  days:number = 1; //Propiedad que ayuda a calcular el valor del alquiler por dias
  hoveredDate: NgbDate | null = null;
  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  suscripcion: Subscription = new Subscription();//Propiedad subscripcion para obtener los datos almacenados en el localstorage

  //Se utiliza el servicio de vehiculos para obtener los datos del vehiculo seleccionado
  constructor(
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
    private calendar: NgbCalendar, 
    public formatter: NgbDateParserFormatter    
  ) { 
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 2);
  }

  ngOnInit(): void {
    //Se recibe la informacion proveniente de la vista de tarjetas de los vehiculos, y luego se crea el formulario reactivo
    this.suscripcion = this.vehicleService.ObtenerDatosVehiculos().subscribe((datos: Vehiculo) => {
      this.vehiculo = datos;
      this.CreateForm(this.vehiculo);
    });
    
  }

  CreateForm(_data:any) {
    //Se consulta el tipo de solicitud para saber que tipo de valor y que fecha se va a colocar en el formulario
    if(_data.solicitud === 'compra') {
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
      fecha_salida: [""],
      fecha_retorno: [""],
      fecha_venta: [""],
    });

  }

  //Metodo para obtener los datos que han sido ingresado al formulario
  get GetForm() {
    return this.form.controls;
  }

  //El selector de rango se activa cuando recibe la instruccion de que lo que se va a realizar es un alquiler
  onDateSelection(date: NgbDate, datepicker: any) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      datepicker.close();
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
      this.toDate = date;
      datepicker.close();
      //Al seleccionar el rango se procede a calcular los dias elegidos
      this.days = this.CalcularDias();
      //El numero de dias se multiplica por le valor del alquiler predefinido del vehiculo
      let valor = this.valor * this.days;
      //Se setea el valor en el correspondiente input del formulario
      this.form.controls['valor'].setValue(`$${valor}`);
    } else {
      this.toDate = null;
      this.fromDate = date;
      
    }
  }

  //Metodo para calcular la cantidad de dias elegida en el rango.
  CalcularDias() : number {
    const fecha_salida: Date = this.createDateFromNgbDate(this.fromDate);
    const fecha_retorno: Date = this.createDateFromNgbDate(this.toDate);  
    const dias = Math.floor(Math.abs(<any>fecha_salida - <any>fecha_retorno) / (1000*60*60*24));
    return dias;
  }

  //Metodo para parsear un ngbdate a un date
  createDateFromNgbDate(ngbDate: NgbDate | any): Date {
    const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month-1, ngbDate.day));  
    return date;
  }

  //Bloque de metodos que necesita el datepicker del ng-bootstrap para funcionar
  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }


}
