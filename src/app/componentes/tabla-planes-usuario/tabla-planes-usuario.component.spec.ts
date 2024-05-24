import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPlanesUsuarioComponent } from './tabla-planes-usuario.component';

describe('TablaPlanesUsuarioComponent', () => {
  let component: TablaPlanesUsuarioComponent;
  let fixture: ComponentFixture<TablaPlanesUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaPlanesUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaPlanesUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
