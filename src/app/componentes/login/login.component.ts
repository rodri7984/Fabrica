import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { error } from 'console';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { AppComponent } from '../app-root/app.component';
import { formatDate } from '@angular/common';
import { PlanService } from '../../core/services/plan.service';
import { TipoPlan } from '../../modelos/tipo-plan';
import { Location } from '@angular/common';
import { Plan } from '../../modelos/plan';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import dayjs from 'dayjs';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import utc from 'dayjs/plugin/utc';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,

  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private authFirebase: AuthService,
    private fb: FormBuilder
  )
  {}

  emailUser = '';
  passwordUser = '';

  mensaje1 = 'Correo invalido';
  mensaje2 = 'Correo no encontrado';
  mensaje3 = 'Problemas de conexión';
  mensaje4 = 'usuario o contraseña incorrecta';

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });
  

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

  guardarDatos(){}
}
