import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/usuarios';
  

  constructor(private httpClient: HttpClient) {}

  agregarUsuario(usuario: any) {
    return this.httpClient.post(`${this.apiUrl}/createUsuario`, usuario);
  }
}


