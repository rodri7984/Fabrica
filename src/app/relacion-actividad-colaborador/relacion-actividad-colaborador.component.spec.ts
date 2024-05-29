import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelacionActividadColaboradorComponent } from './relacion-actividad-colaborador.component';

describe('RelacionActividadColaboradorComponent', () => {
  let component: RelacionActividadColaboradorComponent;
  let fixture: ComponentFixture<RelacionActividadColaboradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelacionActividadColaboradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RelacionActividadColaboradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
