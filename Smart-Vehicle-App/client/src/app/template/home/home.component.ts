import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserFormModel } from 'src/app/models/form-user.model';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  carimg: string;
  motorcycleimg: string;
  scooterimg: string;
  form: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private dialog: MatDialog, 
    ) {
    this.carimg = 'assets/images/car.jpg';
    this.scooterimg = 'assets/images/scooter.jpg';
    this.motorcycleimg = 'assets/images/motorcycle.jpg';
  }

  ngOnInit(): void {
    this.carimg = 'assets/images/car.jpg';
    this.scooterimg = 'assets/images/scooter.jpg';
    this.motorcycleimg = 'assets/images/motorcycle.jpg';
    this.CreateForm();
  }

  CreateForm() {
    this.form = this.formBuilder.group({
      nombre_completo:["", ], 
      email: ["", [Validators.required,Validators.email]],
      comentario: ["", [Validators.required]],
    })
  }

  AbrirDialogo (){
    this.dialog.open(MailSentComponent);
  }

  EnviarComentario () {
    if(this.form.invalid) {
      console.log("No valido");
    }
    else {
      let modelo = new UserFormModel();
      modelo.nombre = this.GetForm.nombre_completo.value;
      modelo.email = this.GetForm.email.value;
      modelo.comentario = this.GetForm.comentario.value;
      this.notificationService.SendEmail(modelo).subscribe((data: any) => {
        this.AbrirDialogo ();
      });
    }
  }
  get GetForm() {
    return this.form.controls;
  }
}

@Component({
  selector: 'app-mail-sent',
  templateUrl: './mail-sent.component.html',
})

export class MailSentComponent{
  RefrescarFormulario(){
    window.location.reload();
  }
}

