import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColaboradoresComponentComponent } from './colaboradores-component.component';

describe('ColaboradoresComponentComponent', () => {
  let component: ColaboradoresComponentComponent;
  let fixture: ComponentFixture<ColaboradoresComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColaboradoresComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ColaboradoresComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
