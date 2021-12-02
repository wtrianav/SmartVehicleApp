import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicle.service';


@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {

  @Output () vehiculo: any;

  constructor(
    private vehicleService: VehicleService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.Filtrar("Todos");
  }

  Filtrar(tipo: string) {

    switch (tipo) {
      case 'Carro':
        this.vehicleService.FiltrarPorCarro().subscribe({
          next: (data: any) => {
            this.vehiculo = Object.values(data);
            console.log(data);
            console.log(this.vehiculo);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
        break;
      case 'Motocicleta':
        this.vehicleService.FiltrarPorMoto().subscribe({
          next: (data: any) => {
            this.vehiculo = Object.values(data);
            console.log(data);
            console.log(this.vehiculo);
          },
          error: (error: any) => {
            console.log(console.error);
          }
        });
        break;
      case 'Scooter':
        this.vehicleService.FiltrarPorScooter().subscribe({
          next: (data: any) => {
            this.vehiculo = Object.values(data);
            console.log(data);
            console.log(this.vehiculo);
          },
          error: (error: any) => {
            console.log(console.error);
          }
        });
        break;
      case 'Todos':
        this.vehicleService.FiltrarTodos().subscribe({
          next: (data: any) => {
            this.vehiculo = Object.values(data);
            console.log(data);
            console.log(this.vehiculo);
          },
          error: (error: any) => {
            console.log(console.error);
          }
        });
    }
  }

  LanzarSolicitud2(vehicle:any) {
    console.log(typeof(vehicle));
    this.vehicleService.CardTrigger.emit(
      {vehiculo : vehicle}
    )
  }

  LanzarSolicitud(vehicle:any) {
    this.vehicleService.AlmacenarDatosVehiculo(vehicle);
    this.router.navigate(['/request/client-request']);
  }
}
