import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {
   private apiUrl = 'http://localhost:8080/swagger-ui/index.html#/usuario-controller/save';

  constructor(private http: HttpClient) {}

  getclienteList() {
    return this.http.get<any>('http://localhost:8080/swagger-ui/index.html#/usuario-controller/save');
  }
}
