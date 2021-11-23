import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitarVehiculoComponent } from './solicitar-vehiculo.component';

describe('SolicitarVehiculoComponent', () => {
  let component: SolicitarVehiculoComponent;
  let fixture: ComponentFixture<SolicitarVehiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolicitarVehiculoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolicitarVehiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
