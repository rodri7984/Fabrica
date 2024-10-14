import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pago } from '../../modelos/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private apiUrl = 'http://127.0.0.1:8000/pagos';

  constructor(private httpClient: HttpClient) { }


  agregarPago(pago: any) {
    return this.httpClient.post(`${this.apiUrl}/createPago`, pago);
  }


    obtenerPagos() {
      return this.httpClient.get<Pago[]>(`${this.apiUrl}/listPagos`);
    }
}
