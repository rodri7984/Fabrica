import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionClientePlanComponent } from './relacion-cliente-plan.component';

describe('RelacionClientePlanComponent', () => {
  let component: RelacionClientePlanComponent;
  let fixture: ComponentFixture<RelacionClientePlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacionClientePlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelacionClientePlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
