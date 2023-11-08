import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-edit-vehicle',
  templateUrl: './edit-vehicle.component.html',
  styleUrls: ['./edit-vehicle.component.css']
})
export class EditVehicleComponent implements OnInit {

  id: string = "";
  form: FormGroup = this.formBuilder.group({
    id: [""],
    tipo_vehiculo: [""],
    marca: [""],
    modelo: [""],
    anio_modelo: [""],
    placa: [""],
    valor_venta: [""],
    valor_alquiler: [""],
    imagen: [""],
    descripcion: [""],

  })
  constructor(
    private formBuilder: FormBuilder,
    private vehicleService: VehicleService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"];
    this.BuscarVehiculo();
  }

  BuscarVehiculo() {
    this.vehicleService.BuscarVehiculo(this.id).subscribe((datos: Vehiculo) => {
      console.log(datos);

      this.form.controls["id"].setValue(this.id);
      this.form.controls["tipo_vehiculo"].setValue(datos.tipo_vehiculo);
      this.form.controls["marca"].setValue(datos.marca);
      this.form.controls["modelo"].setValue(datos.modelo);
      this.form.controls["anio_modelo"].setValue(datos.anio_modelo);
      this.form.controls["placa"].setValue(datos.placa);
      this.form.controls["valor_venta"].setValue(datos.valor_venta);
      this.form.controls["valor_alquiler"].setValue(datos.valor_alquiler);
      this.form.controls["imagen"].setValue(datos.imagen);
      this.form.controls["descripcion"].setValue(datos.descripcion);
    })
  }

  EditarVehiculo() {
    if (this.form.invalid) {
      console.log("No valido");
    }
    else {
      let modelo = new Vehiculo();
      modelo.id = this.id;
      modelo.marca = this.form.controls["marca"].value;
      modelo.tipo_vehiculo = this.form.controls["tipo_vehiculo"].value;
      modelo.modelo = this.form.controls["modelo"].value;
      modelo.anio_modelo = this.form.controls["anio_modelo"].value;
      modelo.placa = this.form.controls["placa"].value;
      modelo.valor_venta = this.form.controls["valor_venta"].value;
      modelo.valor_alquiler = this.form.controls["valor_alquiler"].value;
      modelo.imagen = this.form.controls["imagen"].value;
      modelo.descripcion = this.form.controls["descripcion"].value;
      this.vehicleService.ActualizarVehiculo(modelo).subscribe((datos: Vehiculo) => {
        this.router.navigate(["/administration/vehicle/table-vehicle"])
      },
        (error: any) => {
          console.error(error);

        })

    }
  }

}
