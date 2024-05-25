import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PlanUsuario } from '../../modelos/plan-usuario';

@Injectable({
  providedIn: 'root'
})
export class PlanUsuarioService {

  private apiUrl = 'http://localhost:8080/planesUsuarios';

  constructor(private httpClient: HttpClient) { }

  agregarPlanUsuario(planUsuario: any) {
    return this.httpClient.post(`${this.apiUrl}/createPlanUsuario`, planUsuario);
  }


    obtenerPlanUsuario() {
      return this.httpClient.get<PlanUsuario[]>(`${this.apiUrl}/listPlanUsuario`);// Reemplaza 'URL_DE_TU_API' con la URL real de tu API
    }
}
