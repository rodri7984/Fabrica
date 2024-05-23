import { TestBed } from '@angular/core/testing';

import { PlanUsuarioService } from './plan-usuario.service';

describe('PlanUsuarioService', () => {
  let service: PlanUsuarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PlanUsuarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
