import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserLoginSesionModel } from 'src/app/models/user-credentials';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  session : boolean = true;

  subs: Subscription = new Subscription();

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    //Validar si se inicio sesion correctamente
    this.subs = this.securityService.ObtenerDatosUsuarioEnSesion().subscribe((datos:UserLoginSesionModel) => {
      // if(datos) {
      //   this.session = true; 
      // } else {
      //   this.session = false;
      // }
      this.session = datos.identificado;
    })
  }

}
