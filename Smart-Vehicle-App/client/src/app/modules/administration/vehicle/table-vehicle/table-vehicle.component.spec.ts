import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableVehicleComponent } from './table-vehicle.component';

describe('TableVehicleComponent', () => {
  let component: TableVehicleComponent;
  let fixture: ComponentFixture<TableVehicleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TableVehicleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TableVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
