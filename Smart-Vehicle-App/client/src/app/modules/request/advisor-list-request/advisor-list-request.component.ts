import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { RequestModel, RequestModelClass } from 'src/app/models/solicitud.model';
import { UserLoginSesionModel } from 'src/app/models/user-credentials';
import { RequestService } from 'src/app/services/request.service';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-advisor-list-request',
  templateUrl: './advisor-list-request.component.html',
  styleUrls: ['./advisor-list-request.component.css']
})
export class AdvisorListRequestComponent implements OnInit {

  displayedColumns: string[] = ['solicitante','marca', 'modelo', 'valor', 'tipo_solicitud', 'estado', 'acciones'];
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
  ) { }

  ngOnInit(): void {
    this.ObtenerSesion();
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
          return solicitud.asesorId === this.usuario.id;
        })

        let datos: any = new MatTableDataSource(this.solicitudes);
        // let datos: any = new MatTableDataSource(data);
        this.dataSource = datos;
        console.log(data);
        console.log(datos);
        console.log(this.dataSource);
        
        
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }

  CambiarEstado(estado: string, solicitud: RequestModelClass) {
    solicitud.estado = estado;
    this.requestService.ModifyRequest(solicitud).subscribe(()=> {
      
    })
  }

}
