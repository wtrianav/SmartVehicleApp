import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  carimg: string;
  motorcycleimg: string;
  scooterimg: string;

  constructor() {
    this.carimg = 'assets/images/car.jpg';
    this.scooterimg = 'assets/images/scooter.jpg';
    this.motorcycleimg = 'assets/images/motorcycle.jpg';
  }

  ngOnInit(): void {
    this.carimg = 'assets/images/car.jpg';
    this.scooterimg = 'assets/images/scooter.jpg';
    this.motorcycleimg = 'assets/images/motorcycle.jpg';
  }
}
