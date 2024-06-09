import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesactivarPlanComponent } from './desactivar-plan.component';

describe('DesactivarPlanComponent', () => {
  let component: DesactivarPlanComponent;
  let fixture: ComponentFixture<DesactivarPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DesactivarPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DesactivarPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
