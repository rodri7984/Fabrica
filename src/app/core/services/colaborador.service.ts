import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colaborador } from '../../modelos/colaborador';

@Injectable({
  providedIn: 'root'
})
export class ColaboradorService {
  //private apiUrl = 'http://localhost:8080/colaboradores';

  constructor(private httpClient: HttpClient) { }

  agregarColaborador(colaborador: any) {
    return this.httpClient.post(`${this.apiUrl}/createColaborador`, colaborador);
  }

  obtenercolaboradorDesdeAPI() {
    return this.httpClient.get<Colaborador[]>(`${this.apiUrl}/listColaborador`);// Reemplaza 'URL_DE_TU_API' con la URL real de tu API
  }

  private apiUrl = 'http://localhost:8080/colaboradores';

  cambiarEstadoColaborador(username: string, estado: string) {
    const url = `${this.apiUrl}/changeStateColaborador/${username}`;
    this.httpClient.put(url, { estado }).subscribe(
      response => {
        // Manejo de la respuesta exitosa
        console.log('Estado cambiado con éxito', response);
      },
      error => {
        // Manejo de errores
        console.error('Error al cambiar el estado', error);
      }
    );
  }


  // updateEstado(username: string, estado: string){
  //   return this.httpClient.put<Colaborador[]>(`${this.apiUrl}/changeStateColaborador/${username}/${estado}`);
  // }
}
