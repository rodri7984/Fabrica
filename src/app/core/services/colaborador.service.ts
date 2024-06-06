import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colaborador } from '../../modelos/colaborador';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  private apiUrl = 'http://localhost:8080/colaboradores';

  constructor(private httpClient: HttpClient) { }

  agregarColaborador(colaborador: any) {
    return this.httpClient.post(`${this.apiUrl}/createColaborador`, colaborador);
  }

  obtenercolaboradorDesdeAPI() {
    return this.httpClient.get<Colaborador[]>(`${this.apiUrl}/listColaborador`);// Reemplaza 'URL_DE_TU_API' con la URL real de tu API
  }

    // Cambiar Estado totalmente funcional
    changeEstadoColab(username: string, estado: string): Observable<any> {
      const url = `${this.apiUrl}/changeStateColaborador/${username}/${estado}`;
      return this.httpClient.put(url, { estado});
    }
}
