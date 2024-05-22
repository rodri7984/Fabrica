import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {

  private apiUrl = 'http://localhost:9000/colaborador';

  constructor(private httpClient: HttpClient) {}

  agregarColaborador(usuario: any) {
    return this.httpClient.post(`${this.apiUrl}/createColaborador`, usuario);
  }

  
}
