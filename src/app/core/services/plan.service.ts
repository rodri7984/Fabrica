import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TipoPlan } from '../../modelos/tipo-plan';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:9000/tipoPlan';

  constructor(private httpClient: HttpClient) { }

  agregarPlan(tipoPlan: any) {
    return this.httpClient.post(`${this.apiUrl}/createTipoPlan`, tipoPlan);
  }

  public getJsonValue: any;

  public obtenerTipoPlan() {
    return this.httpClient.get(`${this.apiUrl}/listTipoPlan`).subscribe((data) => {
      // console.table(data);
      this.getJsonValue = data;
      
      
    });
    }

    obtenerPlanesDesdeAPI() {
      return this.httpClient.get<TipoPlan[]>(`${this.apiUrl}/listTipoPlan`);// Reemplaza 'URL_DE_TU_API' con la URL real de tu API
    }

    getPLanes(): Observable<TipoPlan[]> {
      return this.httpClient.get<TipoPlan[]>(`${this.apiUrl}/listTipoPlan`);
    }
}
