import { Component, OnInit } from '@angular/core';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-list-vehicle',
  templateUrl: './list-vehicle.component.html',
  styleUrls: ['./list-vehicle.component.css']
})
export class ListVehicleComponent implements OnInit {

  vehiculo: any;

  constructor(
    private vehicleService: VehicleService,
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
            console.log(console.error);
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
}
