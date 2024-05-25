import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaHPagoComponent } from './tabla-hpago.component';

describe('TablaHPagoComponent', () => {
  let component: TablaHPagoComponent;
  let fixture: ComponentFixture<TablaHPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaHPagoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TablaHPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
