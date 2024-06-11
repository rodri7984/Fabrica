import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authFirebase: AuthService
  )
  {}

  emailUser = '';
  passwordUser = '';

  mensaje1 = 'Correo invalido';
  mensaje2 = 'Correo no encontrado';
  mensaje3 = 'Problemas de conexión';
  mensaje4 = 'usuario o contraseña incorrecta';
  

  async ingresar(){
    const res = await this.authFirebase
      .iniciarSesion( this.emailUser, this.passwordUser)
      .catch((error) => {
        this.inicioInvalido(error)
      })
      if (res){
        console.log('respuesta: ', res)
        console.log('Ingresado con exito '+ this.emailUser)
        const respuesta = await this.authFirebase
        .iniciarSesion(this.emailUser, this.passwordUser)
        // .then(respuesta => {
        //   this
        // })
        
      }
  }

  inicioInvalido( error: any){
    if (error.code === 'auth/invalid-email'){
      console.log('Correo Invalido')
       this.mensaje1;
    } else if (error.code === 'auth/user-not-found') {
       this.mensaje2;
    } else if (error.code === 'auth/network-request-failed'){
       this.mensaje3;
    } else {
       this.mensaje4;
    }
  }
}
