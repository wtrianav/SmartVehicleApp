import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {

  //Arreglo para mostrar las tarjetas de los vehiculos en el frontend (Propiedad)
  vehiculo: any;

  /* Es necesario hacer uso del servicio de vehiculo y de la clase Router */
  constructor(
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.Filtrar("Todos");
  }

  /* Al hacer click en los botones de filtro en el frontend, se trae la opcion de filtraje 
  y este se utiliza para buscar los vehiculos por tipo con ayuda del servicio de vehiculos
   y un filter para array */
  Filtrar(tipo: string) {
    if (tipo === 'Todos') {
      this.vehicleService.ListarVehiculos().subscribe({
        next: (data: any) => {
          this.vehiculo = data;
        },
        error: (error: any) => {
          console.log(console.error);
        }
      });
    } else {
      this.vehicleService.ListarVehiculos().subscribe({
        next: (data: any) => {
          this.vehiculo = data.filter((vehicle: any) => {
            return vehicle.tipo_vehiculo === tipo;
          })
        },
        error: (error: any) => {
          console.log(console.error);
        }
      });
    }
  }

  /* Al hacer click en los botones de compra o alquiler se lanza el formulario de solicitud y segun sea el caso
  se envian los valores de compra o alquiler al formulario */
  LanzarSolicitud(vehicle: any, solicitud: string) {
    this.vehicleService.AlmacenarDatosVehiculo(vehicle, solicitud);
    this.router.navigate(['/request/client-request']);
  }
}
