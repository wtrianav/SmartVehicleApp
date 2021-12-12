import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvisorListRequestComponent } from './advisor-list-request.component';

describe('AdvisorListRequestComponent', () => {
  let component: AdvisorListRequestComponent;
  let fixture: ComponentFixture<AdvisorListRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvisorListRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvisorListRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
