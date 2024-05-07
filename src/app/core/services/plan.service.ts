import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:8080/tipoPlan';

  constructor(private httpClient: HttpClient) { }

  agregarPlan(tipoPlan: any) {
    return this.httpClient.post(`${this.apiUrl}/createTipoPlan`, tipoPlan);
  }
}
