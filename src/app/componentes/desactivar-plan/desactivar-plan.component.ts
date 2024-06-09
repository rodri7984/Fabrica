import { Component, Inject } from '@angular/core';
import { TablaPlanComponent } from '../tabla-plan/tabla-plan.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Plan } from '../../modelos/plan';
import { MatButtonModule } from '@angular/material/button';
import { PlanService } from '../../core/services/plan.service';


@Component({
  selector: 'app-desactivar-plan',
  standalone: true,
  imports: [MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './desactivar-plan.component.html',
  styleUrl: './desactivar-plan.component.css'
})
export class DesactivarPlanComponent {
  planes : Plan[] = [];

  constructor(
    private dialogRef: MatDialogRef<TablaPlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { plan: Plan },
    private planService : PlanService
  ){}

  ngOnInit() {
    this.listarPlanes();
  }

  listarPlanes(){
    this.planService.getPLanes().subscribe((data) => {
      this.planes = data;
    });
    this.planService.getPLanes().subscribe((data) => {
      this.planes = data;
    });
  }
  onCancel(): void {
    // Cierra el diálogo y devuelve 'false'
    this.dialogRef.close(false);
  }
  onConfirm(): void {
    this.changeEstado(this.data.plan);
  }

  changeEstado(planx: Plan): void {
    const newEstado = planx.estado === "ACTIVO" ? "INACTIVO" : "ACTIVO";
    this.planService.desactivarPlan(planx.nombrePlan, newEstado).subscribe(
      response => {
        console.log('Estado del plan actualizado:', response);
        this.dialogRef.close(true); // Cierra el diálogo y actualiza la tabla
      },
      error => {
        console.error('Error al actualizar el estado del plan:', error);
      }
    );
  }
}
