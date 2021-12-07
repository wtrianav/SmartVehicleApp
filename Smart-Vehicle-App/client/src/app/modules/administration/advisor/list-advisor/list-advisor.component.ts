import { Component, OnInit } from '@angular/core';
import { ModelAdvisor } from 'src/app/models/advisor.model';
import { AdvisorService } from 'src/app/services/advisor.service';

@Component({
  selector: 'app-list-advisor',
  templateUrl: './list-advisor.component.html',
  styleUrls: ['./list-advisor.component.css']
})
export class ListAdvisorComponent implements OnInit {

  listAdvisor: ModelAdvisor[] = [];

  constructor(private advisorService: AdvisorService) { }

  ngOnInit(): void {
  }

  GetListAdvisor(){
    this.advisorService.ObtenerRegistros().subscribe((datos: ModelAdvisor[]) => {
      this.listAdvisor = datos;
    })
  }

}
