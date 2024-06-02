import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAddPlanComponent } from './form-add-plan.component';

describe('FormAddPlanComponent', () => {
  let component: FormAddPlanComponent;
  let fixture: ComponentFixture<FormAddPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormAddPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormAddPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
