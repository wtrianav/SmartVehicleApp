import { Component, OnInit } from '@angular/core';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-solicitar-vehiculo',
  templateUrl: './solicitar-vehiculo.component.html',
  styleUrls: ['./solicitar-vehiculo.component.css']
})
export class SolicitarVehiculoComponent implements OnInit {

  vehiculo: any;

  constructor(
    private clienteService: ClienteService,
  ) { }

  ngOnInit(): void {
    this.Filtrar("Todos");
  }

  Filtrar(tipo: string) {

    switch (tipo) {
      case 'Carro':
        this.clienteService.FiltrarPorCarro().subscribe({
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
        this.clienteService.FiltrarPorMoto().subscribe({
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
        this.clienteService.FiltrarPorScooter().subscribe({
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
        this.clienteService.FiltrarTodos().subscribe({
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
