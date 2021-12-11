import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/security.service';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';

@Component({
  selector: 'app-close-session',
  templateUrl: './close-session.component.html',
  styleUrls: ['./close-session.component.css']
})
export class CloseSessionComponent implements OnInit {

  constructor(private localStorageService: LocalStorageService,
    private router: Router) { }

  ngOnInit(): void {
    this.localStorageService.EliminarDatosSesion();
    this.router.navigate(['/home']);
  }

}
