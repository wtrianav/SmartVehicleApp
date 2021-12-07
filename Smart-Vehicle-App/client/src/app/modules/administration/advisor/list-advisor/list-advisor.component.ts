import { Component, OnInit, ViewChild } from '@angular/core';
import {AdvisorCredentialsRegisterModel} from 'src/app/models/user-credentials';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import {PersonService} from 'src/app/services/person.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-advisor',
  templateUrl: './list-advisor.component.html',
  styleUrls: ['./list-advisor.component.css']
})
export class ListAdvisorComponent implements OnInit {

  columns = [
    {
      columnDef: 'id',
      header: 'id',
      cell: (asesor: AdvisorCredentialsRegisterModel) => `${asesor.id}`,
    },
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

  constructor(private personService: PersonService) { }

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
      this.listAdvisor = data;
      let datos: any = new MatTableDataSource(this.listAdvisor);
      datos.filter = "asesor";
        this.dataSource = datos;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    })
  }

}
