import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import { ColaboradorService } from '../services/colaborador.service';

@Component({
  selector: 'app-colaborador',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './colaborador.component.html',
  styleUrl: './colaborador.component.css'
})
export class ColaboradorComponent {

  constructor(
    private fb: FormBuilder,
    private colaboradorServ: ColaboradorService

  ){}

  colForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rolColaborador: ['', Validators.required],
    estado: ["ACTIVO"]
  });

  guardarColaborador(){
    if(this.colForm.valid) {
      this.colaboradorServ.agregarColaborador(this.colForm.value).subscribe(
        (response) => {
          console.log('Colaborador guardado exitosamente: ', response);
        },
      (error) => {
        console.error('Error al guardar colaborador: ', error);
      });
    } else {
      console.warn('El formulario no es valido. Verifica los campos')
    }
  }

  tipoColaborador: string[]= ['Administrador', 'Staff'];

  selecTipoColaborador(event: any) {
    const selectedValue = event.value;
    this.colForm.get('rolColaborador')?.setValue(selectedValue); 
  }

  /*
  //para la proxima
  tipoEstado: string[]= ['Activo', 'Inactivo'];
  
  selecTipoEstado(event: any) {
    const selectedValue = event.value;
    this.colForm.get('estado')?.setValue(selectedValue); 
  }
  */

}
