import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Plan } from '../../modelos/plan';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { PlanService } from '../../core/services/plan.service';

@Component({
  selector: 'app-editar-plan',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

    ],
  templateUrl: './editar-plan.component.html',
  styleUrl: './editar-plan.component.css'
})
export class EditarPlanComponent implements OnInit {
  
  relacionForm: FormGroup;
  planes: Plan[] = [];
  
  
  
  ngOnInit(): void {
    this.planService.getPLanes().subscribe((data) => {
      this.planes = data.filter(plan => plan.estado === "ACTIVO");
    });
    if (this.data.plan) {
      this.relacionForm.patchValue(this.data.plan);
    }
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { plan: Plan },
    private fb: FormBuilder,
    private http: HttpClient,
    private planService: PlanService,
    private dialogRef: MatDialogRef<EditarPlanComponent>
  ){
    this.relacionForm = this.fb.group({
      idPlan: [{ value: '', disabled: true }],
      nombrePlan: ['', Validators.required],
      valorPlan: [ null, Validators.required],
      estado: [{ value: '', disabled: true }],
      descripcionPlan: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.relacionForm.valid) {
      const planActualizado: Plan = {
        ...this.data.plan,
        ...this.relacionForm.getRawValue(),
        idPlan: this.data.plan.idPlan, 
        estado: this.data.plan.estado  
      };
      this.planService.actualizarPlan(planActualizado).subscribe(response => {
        console.log('Plan actualizado:', response);
        this.dialogRef.close(true); // Cierra el diálogo y devuelve un valor verdadero
      }, (error: any) => {
        console.log('objeto: ', planActualizado)
        console.error('Error al actualizar el plan:', error);
      });
    }
  }

 

}
