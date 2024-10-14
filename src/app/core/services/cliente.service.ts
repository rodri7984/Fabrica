import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from '../../usuario';
import { Observable } from 'rxjs';
import { run } from 'node:test';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private apiUrl = 'http://127.0.0.1:8000/users';
  
  private run = '19331975';

  constructor(private httpClient: HttpClient ) { }



  agregarUsuario(usuario: any) {
    
    return this.httpClient.post(`${this.apiUrl}/createUsuario`, usuario);
  }

  public getJsonValue: any;

  public getMetodo() {
    return this.httpClient.get(`${this.apiUrl}/listUsuarios`).subscribe((data) => {
      // console.table(data);
      this.getJsonValue = data;
      
      
    });
    }

    getUsuarios(): Observable<Usuario[]> {
      return this.httpClient.get<Usuario[]>(`${this.apiUrl}/listUsuarios`);
    }

   
    
    actualizarCliente(usuario: Usuario): Observable<any> {
      const url = `${this.apiUrl}/updateUsuario/${usuario.run}`;  // Incluye el run en la URL
      return this.httpClient.put(url, usuario);
    }
  
    actualizarPlanTrue(run: string): Observable<Usuario> {
      return this.httpClient.put<Usuario>(`${this.apiUrl}/changeTienePlan/${run}/true`, {});
    }
  
}

