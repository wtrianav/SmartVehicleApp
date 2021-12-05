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

  session: boolean = true;
  sessionClient: boolean = false;
  sessionAdvisor: boolean = false;
  sessionAdmin: boolean = false;
  nombre: string | undefined = "";

  subs: Subscription = new Subscription();

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    //Validar si se inicio sesion correctamente
    this.subs = this.securityService.ObtenerDatosUsuarioEnSesion().subscribe((datos: UserLoginSesionModel) => {
      // if(datos) {
      //   this.session = true; 
      // } else {
      //   this.session = false;
      // }
      console.log(datos.role);
      this.nombre = datos.nombre;

      if (datos.identificado == true) {
        switch (datos.role) {
          case "cliente":
            this.sessionClient = true;
            break;
          case "asesor":
            this.sessionAdvisor = true;
            break;
          case "admin":
            this.sessionAdmin = true;
            break;
        }
      } else {
        this.sessionClient = false;
        this.sessionAdvisor = false;
        this.sessionAdmin = false;
      }
      this.session = datos.identificado;
    })
  }

}
