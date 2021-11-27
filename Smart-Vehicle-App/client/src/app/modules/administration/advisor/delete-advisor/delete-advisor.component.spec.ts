import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAdvisorComponent } from './delete-advisor.component';

describe('DeleteAdvisorComponent', () => {
  let component: DeleteAdvisorComponent;
  let fixture: ComponentFixture<DeleteAdvisorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAdvisorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAdvisorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
