import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-close-session',
  templateUrl: './close-session.component.html',
  styleUrls: ['./close-session.component.css']
})
export class CloseSessionComponent implements OnInit {

  constructor(private securityService: SecurityService,
    private router: Router) { }

  ngOnInit(): void {
    this.securityService.EliminarInformacionSesion();
    this.router.navigate(['/home']);
  }

}
