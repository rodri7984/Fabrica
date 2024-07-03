import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ColaboradorService } from '../../core/services/colaborador.service';
import { Colaborador } from '../../modelos/colaborador';

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
    MatMomentDateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  constructor(
    public servicioLogin: ColaboradorService
  )
  {}

  ngOnInit(): void {
      this.servicioLogin.obtenercolaboradorDesdeAPI().subscribe(respuesta => {
        this.colaboradores = respuesta;
      })
  }

  user = '';
  password  = '';
  email = '';

  colaboradores: any[] = [];
  

  metodoCompararUser(){
    const login_user = this.colaboradores.find(colaborador => 
      colaborador.user === this.user);
    if (login_user){
      console.log('Usuario encontrado: ', login_user);
    } else {
      console.log('Usuario no encontrado');
    }
  }

  metodoCompararPassword(){
    const login_password = this.colaboradores.find(colaborador => 
      colaborador.password === this.password);
    if (login_password){
      console.log('Constraseña correcta: ', login_password);
    } else {
      console.log('Contraseña incorrecta');
    }
  }

  // iniciarSesion(){
  // this
  // }


}
