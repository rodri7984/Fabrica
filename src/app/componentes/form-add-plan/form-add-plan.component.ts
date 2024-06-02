import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { PlanService } from '../../core/services/plan.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-form-add-plan',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule
  ],
  templateUrl: './form-add-plan.component.html',
  styleUrl: './form-add-plan.component.css'
})
export class FormAddPlanComponent {
  @Output() planAgregado = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private planService: PlanService,
    private dialogRef: MatDialogRef<FormAddPlanComponent>
  ) {}
  contadorPlanes: number = 0;

  stringContadorPlanes: string = '';

  planForm = this.fb.group({
    idPlan: ['', ],
    nombrePlan: ['', Validators.required],
    valorPlan: ['', Validators.required],
    descripcionPlan: ['', Validators.required],
    estado: ['ACTIVO']
  });

  ngOnInit(): void {
    this.listarPlanes();
  }

  listarPlanes(){
    this.planService.getPLanes().subscribe((data) => {
      this.contadorPlanes = data.length + 1;
      this.stringContadorPlanes = this.contadorPlanes.toString();
      // this.planForm.patchValue({idPlan: idPlan});
    });
  }
  
  guardarPlan() {
    if (this.planForm.valid) {
      this.planService.agregarPlan(this.planForm.value).subscribe(
        (response: any) => {
          this.planAgregado.emit();
          this.dialogRef.close(true);
          this.listarPlanes();
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
}

