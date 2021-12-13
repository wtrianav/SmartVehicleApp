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
import { AdvisorService } from 'src/app/services/advisor.service';

@Component({
  selector: 'app-list-advisor',
  templateUrl: './list-advisor.component.html',
  styleUrls: ['./list-advisor.component.css']
})
export class ListAdvisorComponent implements OnInit {

  //Se declaran las columnas de la tabla a mostrar haciendo uso del modelo de asesor
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

  
  //Se declaran las propiedades del componente
  listAdvisor: AdvisorCredentialsRegisterModel[] | undefined; //Lista de asesore que se obtiene desde el backend

  displayedColumns = this.columns.map(c => c.columnDef); //Lista de columnas a mostrar de la tabla
  clickedRows = new Set<AdvisorCredentialsRegisterModel>(); //Set que se utiliza para obtener la informacion de la fila que fue seleccionada o clickeada
  dataSource: any; //dtasource que se utiliza para renderizar la informacion en la tabla

  @ViewChild(MatPaginator)
  paginator!: MatPaginator; //Objeto para realizar la paginacion de la tabla
  @ViewChild(MatSort)
  sort!: MatSort; //Objeto que se utiliza para organizar la tabla

  //Se inyectan las dependencias del componente en el constructor
  constructor(
    private advisorService: AdvisorService, 
    public dialog: MatDialog,
    ) {}

  //Metodo que se ejecuta al iniciar el componente
  ngOnInit(): void {
    //Se obtiene la informacion de los asesores
    this.GetListAdvisor();
  }

  //Metodo para filtrar la informacion de la tabla por medio del cuadro de busqueda
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue;
    console.log(this.dataSource);
  }

  GetListAdvisor(){
    this.advisorService.ListarAsesor().subscribe((data: AdvisorCredentialsRegisterModel[]) => {
      //Se realiza el filtrado de la informacion proveniente del backend
      this.listAdvisor = data.filter((asesor: any) => {
        return asesor.tipo_persona === 'asesor';
      })
      //Se inyecta la informacion en el datasource para posteriormente mostrarlo en la tabla
      let datos: any = new MatTableDataSource(this.listAdvisor);
      // datos.filter = "asesor";
        this.dataSource = datos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

  //Metodo para abrir dialogo de eliminar asesor
  openDialog(asesor: any) {
    //Se abre el componente del dialogo
    this.dialog.open(DeleteAdvisorComponent);
    //Se almacena la informacion de la fila clickeada en el localstorage
    this.advisorService.AlmacenarDatosAsesor(asesor);
  }
}

@Component({
  selector: 'app-delete-advisor',
  templateUrl: './delete-advisor.component.html',
})
export class DeleteAdvisorComponent implements OnInit {

  id: string | any = "";
  suscripcion: Subscription = new Subscription();//Propiedad subscripcion para obtener los datos almacenados en el localstorage

  //Se inyectan las dependencias del componente en el constructor
  constructor(
    private advisorService: AdvisorService, 
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit() {
    //Se obtienen los datos almacenados en el localstorage para luego proceder a eliminar el asesor
    this.suscripcion = this.advisorService.ObtenerDatosAsesor().subscribe((datos: AdvisorCredentialsRegisterModel) => {
      this.id = datos.id;
    });
  }

  EliminarAsesor() {
    //Se hace uso del servicio de asesor para eliminarlo
    this.advisorService.EliminarAsesor(this.id).subscribe((data: any) => {
      //Al eliminar el asesor de la BD, se abre un snackbar de confirmacion
      let snackbar = this._snackBar.open("Asesor eliminado", "Aceptar");
      snackbar.afterDismissed().subscribe(() => {
        //Se recarga la pagina para visualizar los cambios
        window.location.reload();
      })
    }, (error: any) => {
      this._snackBar.open("Ha ocurrido un error al tratar de eliminar el asesor", "Aceptar");
    })
  }
}