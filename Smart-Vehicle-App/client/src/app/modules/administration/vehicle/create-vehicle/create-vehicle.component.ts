import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-create-vehicle',
  templateUrl: './create-vehicle.component.html',
  styleUrls: ['./create-vehicle.component.css']
})
export class CreateVehicleComponent implements OnInit {

  form: FormGroup = new FormGroup({});
  constructor(private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      tipo_vehiculo: ['', Validators.required],
      marca: ['', Validators.required],
      modelo: ['', Validators.required],
      anio_modelo: ['', Validators.required],
      placa: ["", Validators.required],
      valor_venta: ["", Validators.required],
      valor_alquiler: ["", Validators.required],
      url_imagen: ["", Validators.required],
      descripcion_vehiculo: ["", Validators.required],
    });
  }

  CrearVehiculo() {
    if (this.form.invalid) {
      console.log("Error");
    } else {
      let modelo = new Vehiculo();
      modelo.tipo_vehiculo = this.form.controls["tipo_vehiculo"].value;
      modelo.marca = this.form.controls["marca"].value;
      modelo.modelo = this.form.controls["modelo"].value;
      modelo.anio_modelo = this.form.controls["anio_modelo"].value;
      modelo.placa = this.form.controls["placa"].value;
      modelo.valor_venta = this.form.controls["valor_venta"].value;
      modelo.valor_alquiler = this.form.controls["valor_alquiler"].value;
      modelo.imagen = this.form.controls["url_imagen"].value;
      modelo.descripcion = this.form.controls["descripcion_vehiculo"].value;
      this.vehicleService.CrearVehiculo(modelo).subscribe(() => {
        console.log("Vehículo creado");
        this.router.navigateByUrl("/administration/vehicle/table-vehicle");
      }, err => { console.log("Error") });
    }
  }
}
