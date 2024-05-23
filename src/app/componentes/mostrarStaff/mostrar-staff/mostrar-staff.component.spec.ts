import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarStaffComponent } from './mostrar-staff.component';

describe('MostrarStaffComponent', () => {
  let component: MostrarStaffComponent;
  let fixture: ComponentFixture<MostrarStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarStaffComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
