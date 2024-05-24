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
import { PlanService } from '../../core/services/plan.service';
import { response } from 'express';


@Component({
  selector: 'app-plan',
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
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css'
})
export class PlanComponent {

  constructor(
    private fb: FormBuilder,
    private planService: PlanService
  ) { }

  planForm = this.fb.group({
    idPlan: ['', Validators.required],
    nombrePlan: ['', Validators.required],
    valorPlan: ['', Validators.required],
    descripcionPlan: ['', Validators.required]
  });

  guardarPlan() {
    if (this.planForm.valid) {
      this.planService.agregarPlan(this.planForm.value).subscribe(
        (response: any) => {
          console.log('Plan guardado exitosamente: ', response);
        },
        (error: any) => {
          console.error('Error al guardar plan: ', error);
        });
    } else {
      console.warn('El formulario no es valido. Verifica los campos')
    }
  }

  

}
