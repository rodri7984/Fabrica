import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanUsuario } from '../../modelos/plan-usuario';

@Injectable({
  providedIn: 'root'
})
export class PlanUsuarioService {

  private apiUrl = 'http://127.0.0.1:8000/PlanesUsuario';

  constructor(private httpClient: HttpClient) { }

  agregarPlanUsuario(planUsuario: any) {
    return this.httpClient.post(`${this.apiUrl}/createPlanesUsuario`, planUsuario);
  }


  obtenerPlanUsuario() {
    return this.httpClient.get<PlanUsuario[]>(`${this.apiUrl}/listPlanesUsuario`);
  }
}
