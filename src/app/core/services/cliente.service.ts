import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://localhost:8080/usuarios';
  

  constructor(private http: HttpClient) {}

  agregarUsuario(usuario: any) {
    return this.http.post(`${this.apiUrl}/creaUsuario`, usuario);
  }
}


