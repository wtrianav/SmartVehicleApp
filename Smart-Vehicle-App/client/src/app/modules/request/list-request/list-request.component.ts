import { Component, OnInit } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-list-request',
  templateUrl: './list-request.component.html',
  styleUrls: ['./list-request.component.css']
})
export class ListRequestComponent implements OnInit {
  solicitudes: any;
  constructor(
    private requestService: RequestService,
  ) { }

  ngOnInit(): void {
    this.ListarSolicitudes();
    
  }
  ListarSolicitudes() {
    this.requestService.ListRequest().subscribe({
      next: (data: any) => {
        this.solicitudes = Object.values(data);
        console.log(data);
        console.log(this.solicitudes);
      },
      error: (error: any) => {
        console.log(error);
      }
    })
  }
}
