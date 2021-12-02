import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehiculo } from 'src/app/models/vehiculo.model'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-client-request',
  templateUrl: './client-request.component.html',
  styleUrls: ['./client-request.component.css']
})
export class ClientRequestComponent implements OnInit {

  marca: any;
  vehiculo = new Vehiculo();
  form: FormGroup = new FormGroup({});

  suscripcion: Subscription = new Subscription();

  constructor(
    private vehicleService: VehicleService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    //Se crea el formulario a enviar

    
    this.suscripcion = this.vehicleService.ObtenerDatosVehiculos().subscribe((datos: Vehiculo) => {
      this.vehiculo = datos;
      this.CreateForm(this.vehiculo);
    });
    
  }

  CreateForm(_data:any) {
    
    this.form = this.formBuilder.group({
      marca: [_data.marca, [Validators.required]],
      modelo: [_data.anio_modelo],
      valor: [""],
      departamento: [""],
      ciudad: [""],
      direccion: [""],
      fecha_salida: [""],
      fecha_retorno: [""],
      fecha_venta: [""],
    });

  }

  ObtenerDatosDeTarjetas() {
    //Se reciben los datos del vehiculo despues de dar click en la tarjeta
    this.vehicleService.CardTrigger.subscribe({
      next: (data: any) => {
        this.vehiculo = data;
        console.log(this.vehiculo);
      }
      , error: (error: any) => {
        console.log(error);
      }
    });
  }

  get GetForm() {
    return this.form.controls;
  }

}
