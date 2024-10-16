import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plan } from '../../modelos/plan';

@Injectable({
  providedIn: 'root'
})
export class PlanService {
  private apiUrl = 'http://localhost:8000/planes';

  constructor(private httpClient: HttpClient) { }

  agregarPlan(planData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/createPlan`, planData);
  }


    obtenerPlanesDesdeAPI() {
      return this.httpClient.get<Plan[]>(`${this.apiUrl}/listPlanes`);// Reemplaza 'URL_DE_TU_API' con la URL real de tu API
    }

    getPLanes(): Observable<Plan[]> {
      return this.httpClient.get<Plan[]>(`${this.apiUrl}/listPlanes`);
    }

    desactivarPlan(nombrePlan: string, estado: string): Observable<any> {
      const url = `${this.apiUrl}/changeStatePlan/${nombrePlan}/${estado}`;
      return this.httpClient.put(url, { estado});
    }

    actualizarPlan(plan: Plan): Observable<any> {
      const url = `${this.apiUrl}/updatePlan`;
      return this.httpClient.put(url, plan);
    }
       

}
