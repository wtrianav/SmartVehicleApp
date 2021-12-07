import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
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

  displayedColumns: string[] = ['marca', 'modelo', 'anio_modelo', 'placa', 'valor_venta', 'valor_alquiler'];
  clickedRows = new Set<Vehiculo>();
  dataSource: any;
  vehiculos: Vehiculo[] | undefined;
  id: string = "";

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;


  constructor(
    private vehicleService: VehicleService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ListarVehiculos();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);
  }

  ListarVehiculos() {
    this.vehicleService.ListarVehiculos().subscribe((data: any) => {
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

  openDialog(vehiculo: any) {
    this.dialog.open(DeleteVehicleComponent);
    this.vehicleService.AlmacenarDatosVehiculo(vehiculo);
  }


}

@Component({
  selector: 'app-delete-vehicle',
  templateUrl: './delete-vehicle.component.html',
})
export class DeleteVehicleComponent implements OnInit {

  id: string | any = "";
  suscripcion: Subscription = new Subscription();//Propiedad subscripcion para obtener los datos almacenados en el localstorage

  constructor(
    private vehicleService: VehicleService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.suscripcion = this.vehicleService.ObtenerDatosVehiculos().subscribe((datos: Vehiculo) => {
      this.id = datos.id;
    });
    console.log(this.id);

  }

  EliminarVehiculo() {
    this.vehicleService.EliminarVehiculo(this.id).subscribe((data: any) => {
      let snackbar = this._snackBar.open("Vehiculo eliminado", "Aceptar");
      snackbar.afterDismissed().subscribe(() => {
        console.log("El snackbar fue cerrado");
        window.location.reload();
        // this.router.navigateByUrl('/administration/vehicle/list-vehicle');
      })


    }, (error: any) => {
      this._snackBar.open("Ha ocurrido un error al tratar de eliminar el vehiculo", "Aceptar");
    })
  }
}