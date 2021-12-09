import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RequestModel, RequestModelClass } from 'src/app/models/solicitud.model';
import { RequestService } from 'src/app/services/request.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { HtmlParser } from '@angular/compiler';
import { SecurityService } from 'src/app/services/security.service';
import { Subscription } from 'rxjs';
import { UserLoginSesionModel } from 'src/app/models/user-credentials';



@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit, AfterViewInit {
  columns = [
    {
      columnDef: 'marca',
      header: 'Marca',
      cell: (solicitud: RequestModel) => `${solicitud.marca}`,
    },
    {
      columnDef: 'modelo',
      header: 'Modelo',
      cell: (solicitud: RequestModel) => `${solicitud.modelo}`,
    },
    {
      columnDef: 'valor',
      header: 'Valor',
      cell: (solicitud: RequestModel) => `${solicitud.valor}`,
    },
    {
      columnDef: 'tipo_solicitud',
      header: 'Tipo de Solicitud',
      cell: (solicitud: RequestModel) => `${solicitud.tipo_solicitud}`,
    },
    {
      columnDef: 'fecha_salida',
      header: 'Fecha de Salida',
      cell: (solicitud: RequestModel) => `${solicitud.fecha_salida}`,
    },
    {
      columnDef: 'fecha_retorno',
      header: 'Fecha de Retorno',
      cell: (solicitud: RequestModel) => `${solicitud.fecha_retorno}`,
    },
    {
      columnDef: 'fecha_venta',
      header: 'Fecha de Venta',
      cell: (solicitud: RequestModel) => `${solicitud.fecha_venta}`,
    },
    {
      columnDef: 'estado',
      header: 'Estado',
      cell: (solicitud: RequestModel) => `${solicitud.estado}`,
    },
  ];

  // @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;

  displayedColumns = this.columns.map(c => c.columnDef);
  clickedRows = new Set<RequestModel>();
  dataSource: any;
  solicitudes: RequestModel[] | undefined;
  usuario = new UserLoginSesionModel();
  suscripcion: Subscription = new Subscription();//Propiedad subscripcion para obtener los datos almacenados en el localstorage

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(
    private requestService: RequestService,
    private securityService: SecurityService,

  ) {
  }

  ngAfterViewInit() {

  }

  ngOnInit(): void {
    this.ObtenerSesion()
    this.ListarSolicitudes();
  }

  ObtenerSesion() {
    this.suscripcion = this.securityService.ObtenerDatosUsuarioEnSesion().subscribe((datos: any) => {
      this.usuario = datos;
      console.log(this.usuario);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);

  }

  ListarSolicitudes() {
    this.requestService.ListRequest().subscribe({
      next: (data: any) => {

        this.solicitudes = data.filter((solicitud: RequestModelClass) => {
          return solicitud.personaId === this.usuario.id;
        })

        let datos: any = new MatTableDataSource(this.solicitudes);
        this.dataSource = datos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
