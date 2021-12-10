import { Component, OnInit, ViewChild } from '@angular/core';
import {AdvisorCredentialsRegisterModel} from 'src/app/models/user-credentials';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PersonService} from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-advisor',
  templateUrl: './list-advisor.component.html',
  styleUrls: ['./list-advisor.component.css']
})
export class ListAdvisorComponent implements OnInit {

  columns = [
    {
      columnDef: 'nombre_completo',
      header: 'Nombre',
      cell: (asesor: AdvisorCredentialsRegisterModel) => `${asesor.nombre_completo}`,
    },
    {
      columnDef: 'nro_documento',
      header: 'Numero de Documento',
      cell: (asesor: AdvisorCredentialsRegisterModel) => `${asesor.nro_documento}`,
    },
    {
      columnDef: 'email',
      header: 'Email',
      cell: (asesor: AdvisorCredentialsRegisterModel) => `${asesor.email}`,
    },
    {
      columnDef: 'telefono',
      header: 'Teléfono',
      cell: (asesor: AdvisorCredentialsRegisterModel) => `${asesor.telefono}`,
    },
  ];

  listAdvisor: AdvisorCredentialsRegisterModel[] | undefined;

  displayedColumns = this.columns.map(c => c.columnDef);
  clickedRows = new Set<AdvisorCredentialsRegisterModel>();
  dataSource: any;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(private personService: PersonService, 
    public dialog: MatDialog,
    ) { }

  ngOnInit(): void {
    this.GetListAdvisor();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);
  }

  GetListAdvisor(){
    this.personService.ObtenerRegistros().subscribe((data: AdvisorCredentialsRegisterModel[]) => {
      this.listAdvisor = data.filter((asesor: any) => {
        return asesor.tipo_persona === 'asesor';
      })
      let datos: any = new MatTableDataSource(this.listAdvisor);
      // datos.filter = "asesor";
        this.dataSource = datos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  openDialog(asesor: any) {
    this.dialog.open(DeleteAdvisorComponent);
    this.personService.AlmacenarDatosAsesor(asesor);
  }
}

@Component({
  selector: 'app-delete-advisor',
  templateUrl: './delete-advisor.component.html',
})
export class DeleteAdvisorComponent implements OnInit {

  id: string | any = "";
  suscripcion: Subscription = new Subscription();//Propiedad subscripcion para obtener los datos almacenados en el localstorage

  constructor(
    private personService: PersonService,
    private _snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit() {
    this.suscripcion = this.personService.ObtenerDatosAsesor().subscribe((datos: AdvisorCredentialsRegisterModel) => {
      this.id = datos.id;
    });
    console.log(this.id);

  }

  EliminarAsesor() {
    this.personService.EliminarAsesor(this.id).subscribe((data: any) => {
      let snackbar = this._snackBar.open("Asesor eliminado", "Aceptar");
      snackbar.afterDismissed().subscribe(() => {
        console.log("El snackbar fue cerrado");
        window.location.reload();
        // this.router.navigateByUrl('/administration/vehicle/list-vehicle');
      })


    }, (error: any) => {
      this._snackBar.open("Ha ocurrido un error al tratar de eliminar el asesor", "Aceptar");
    })
  }
}