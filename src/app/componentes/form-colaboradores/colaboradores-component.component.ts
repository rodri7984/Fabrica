import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
import { ColaboradorService } from '../../core/services/colaborador.service';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MostrarStaffComponent } from '../mostrarStaff/mostrar-staff/mostrar-staff.component';


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
    FormsModule,
    MatDialogModule
  ],
  templateUrl: './colaboradores-component.component.html',
  styleUrl: './colaboradores-component.component.css'
})
export class ColaboradorComponent {
  @Output() colaboradorAgregado = new EventEmitter<void>();
  constructor(
    private fb: FormBuilder,
    private colaboradorService: ColaboradorService,
    private dialogRef: MatDialogRef<MostrarStaffComponent>

  ){}

  public colForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    nombre: ['', Validators.required],
    apellido: ['', Validators.required],
    rolColaborador: ["STAFF"],
    // rolColaborador: ['', Validators.required],
    estado: ["ACTIVO"]
  });

  guardarColaborador(){
    if(this.colForm.valid) {
      this.colaboradorService.agregarColaborador(this.colForm.value).subscribe(
        (response: any) => {
          this.colaboradorAgregado.emit();
          this.dialogRef.close(true);
          console.log('Colaborador guardado exitosamente: ', response);
        },
      (error: any) => {
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


  
  refrescar(): void {

    window.location.reload();
    }
  

}
