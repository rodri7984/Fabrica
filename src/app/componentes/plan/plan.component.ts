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
export class PlanComponent implements OnInit{
  // planForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private planService: PlanService
  ) { 
    // this.planForm = this.fb.group({
    //   idPlan: [this.contadorPlanes],
    //   nombrePlan: ['', Validators.required],
    //   valorPlan: ['', Validators.required],
    //   descripcionPlan: ['', Validators.required]
    // });
  
  }
  contadorPlanes: number = 0;

  stringContadorPlanes: string = '';

  planForm = this.fb.group({
    idPlan: ['', Validators.required],
    nombrePlan: ['', Validators.required],
    valorPlan: ['', Validators.required],
    descripcionPlan: ['', Validators.required]
  });

  ngOnInit(): void {
    this.planService.getPLanes().subscribe((data) => {
      this.contadorPlanes = data.length + 1;
      this.stringContadorPlanes = this.contadorPlanes.toString();
      // this.planForm.patchValue({idPlan: idPlan});
    });
  }

  metodoPrueba(){
    this.planService.getPLanes().subscribe((data) => {
      this.contadorPlanes = data.length + 1;
    });
    return this.contadorPlanes;
  }


  guardarPlan() {
    if (this.planForm.valid) {
      this.planService.agregarPlan(this.planForm.value).subscribe(
        (response: any) => {
          console.log('Plan guardado exitosamente: ', response);
          console.log('id:', this.planForm.value);
        },
        (error: any) => {
          console.error('Error al guardar plan: ', error);
        });
    } else {
      console.warn('El formulario no es valido. Verifica los campos')
    }
  }

  planes: { [key: string]: number } = {};

  obtenerPlanes(){
    this.planService.obtenerPlanesDesdeAPI().subscribe((planes: any[]) => {
      console.log("Planes obtenidos desde la API:", planes);
      this.planes = planes.reduce<{ [key: string]: number }>((acc, plan) => {
        acc[plan.idPlan] = plan.valorPlan;
        return acc;
      }, {});
      console.log("Objeto planes mapeado:", this.planes);
    });
  }

  validadorId1(idPlan: string): number{
    return this.planes[idPlan]
    
  }

  // const name = this.myForm.get('name')?.value; // Captura el valor del campo 'name'
  //   console.log('Nombre:', name);

  /**
  idSolo = this.planForm.get('idPlan')?.value;
  idTipoPlan = this.idSolo;

  idLista = this.planService.obtenerIdPlan();
  valorIdPlan = parseInt(this.idLista, 10);
   */
  // validadorId(){
  //   if(this.validadorId <= this.idTipoPlan){

  //   } else {

  //   }
  // }

}
