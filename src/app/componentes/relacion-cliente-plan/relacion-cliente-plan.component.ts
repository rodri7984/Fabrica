import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { PlanUsuarioService } from '../../core/services/plan-usuario.service';
import { ClienteService } from '../../core/services/cliente.service';
import { Usuario } from '../../usuario';
import { MatSelectModule } from '@angular/material/select';
import { PlanService } from '../../core/services/plan.service';
import { Plan } from '../../modelos/plan';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import dayjs from 'dayjs';

@Component({
  selector: 'app-relacion-cliente-plan',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './relacion-cliente-plan.component.html',
  styleUrl: './relacion-cliente-plan.component.css'
})
export class RelacionClientePlanComponent implements OnInit {

 relacionForm: FormGroup;
 clientes: Usuario[] = [];
 planes :Plan[] = [];

 constructor(
  private dialogRef: MatDialogRef<RelacionClientePlanComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { cliente: Usuario },
  private fb: FormBuilder,
  private http: HttpClient,
  private planUsuarioService : PlanUsuarioService,
  private clienteService : ClienteService,
  private planService : PlanService
) {
  this.relacionForm = this.fb.group({
    run: [data.cliente.run, Validators.required],
    idPlan: ['', Validators.required],
    nombrePlan: ['', Validators.required],
    nombreUsuario: [data.cliente.primerNombre, Validators.required],
    apellidoUsuario: [data.cliente.paternoApellido, Validators.required],
    fechaRegistroPlan: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    monto: [0, Validators.required],
    metodoPago: ['', Validators.required],
    descuento: [0, Validators.required],
    mensualidades: [0, Validators.required]
  });
  this.relacionForm.get('fechaInicio')?.valueChanges.subscribe(() => this.calculateFechaFin());
  this.relacionForm.get('mensualidades')?.valueChanges.subscribe(() => this.calculateFechaFin());
}

calculateFechaFin() {
  const fechaInicio = this.relacionForm.get('fechaInicio')?.value;
  const mensualidades = this.relacionForm.get('mensualidades')?.value;

  if (fechaInicio && mensualidades) {
    const fechaInicioDayjs = dayjs(fechaInicio);
    const fechaFin = fechaInicioDayjs.add(mensualidades, 'month').toDate();
    this.relacionForm.patchValue({ fechaFin });
  }
}

ngOnInit() {
  this.clienteService.getUsuarios().subscribe((data) => {
    this.clientes = data;
  });
  this.planService.getPLanes().subscribe((data) => {
    this.planes = data;
  });
}

onPlanChange(selectedPlanName: string) {
  const selectedPlan = this.planes.find(plan => plan.nombrePlan === selectedPlanName);
  if (selectedPlan) {
    this.relacionForm.patchValue({
      idPlan: selectedPlan.idPlan,
      monto: selectedPlan.valorPlan
    });
  }
}

postRelacion() {
  if (this.relacionForm.valid) {

    this.planUsuarioService.agregarPlanUsuario(this.relacionForm.value).subscribe(
      (response) => {
        console.log('Relacion guardada exitosamente:', response);
      },
      (error) => {
        console.error('Error al guardar el usuario:', error);

      }
    );
  } else {
    console.warn('El formulario no es válido. Verifica los campos.');
  }
}
}
