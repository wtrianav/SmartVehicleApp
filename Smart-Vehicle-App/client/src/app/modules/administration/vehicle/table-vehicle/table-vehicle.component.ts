import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Vehiculo } from 'src/app/models/vehiculo.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-table-vehicle',
  templateUrl: './table-vehicle.component.html',
  styleUrls: ['./table-vehicle.component.css']
})
export class TableVehicleComponent implements OnInit {
  columns = [
    {
      columnDef: 'marca',
      header: 'Marca',
      cell: (vehiculo: Vehiculo) => `${vehiculo.marca}`,
    },
    {
      columnDef: 'modelo',
      header: 'Modelo',
      cell: (vehiculo: Vehiculo) => `${vehiculo.modelo}`,
    },
    {
      columnDef: 'anio_modelo',
      header: 'Año',
      cell: (vehiculo: Vehiculo) => `${vehiculo.anio_modelo}`,
    },
    {
      columnDef: 'placa',
      header: 'Placa',
      cell: (vehiculo: Vehiculo) => `${vehiculo.placa}`,
    },
    {
      columnDef: 'valor_venta',
      header: 'Valor de Venta',
      cell: (vehiculo: Vehiculo) => `${vehiculo.valor_venta}`,
    },
    {
      columnDef: 'valor_alquiler',
      header: 'Valor de Alquiler',
      cell: (vehiculo: Vehiculo) => `${vehiculo.valor_alquiler}`,
    },
    
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  clickedRows = new Set<Vehiculo>();
  dataSource: any;
  vehiculos: Vehiculo[] | undefined;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private vehicleService: VehicleService,
  ) { }

  ngOnInit(): void {
    this.ListarVehiculos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);
  }

  ListarVehiculos(){
    this.vehicleService.ListarVehiculos().subscribe((data:any) =>{
      this.vehiculos = data;
      let datos = new MatTableDataSource(this.vehiculos);
      this.dataSource = datos;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    },
    (error: any) => {
      console.error(error);
    })
  }
}
