import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlanComponent } from './tabla-plan.component';

describe('TablaPlanComponent', () => {
  let component: TablaPlanComponent;
  let fixture: ComponentFixture<TablaPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
