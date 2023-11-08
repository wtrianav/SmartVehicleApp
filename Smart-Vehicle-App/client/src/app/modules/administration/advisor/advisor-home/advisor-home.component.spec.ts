import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorHomeComponent } from './advisor-home.component';

describe('AdvisorHomeComponent', () => {
  let component: AdvisorHomeComponent;
  let fixture: ComponentFixture<AdvisorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
