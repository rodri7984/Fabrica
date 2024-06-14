import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MostrarBienvenidaComponent } from './mostrar-bienvenida.component';

describe('MostrarBienvenidaComponent', () => {
  let component: MostrarBienvenidaComponent;
  let fixture: ComponentFixture<MostrarBienvenidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MostrarBienvenidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MostrarBienvenidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
