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
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import dayjs from 'dayjs';
import { MatMomentDateModule, MomentDateAdapter  } from '@angular/material-moment-adapter';
import * as moment from 'moment';
import 'moment/locale/es';

const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-relacion-cliente-plan',
  standalone: true,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'es' },
  ],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule,
    MatDatepickerModule,
    MatMomentDateModule,
  ],
  templateUrl: './relacion-cliente-plan.component.html',
  styleUrl: './relacion-cliente-plan.component.css'
})
export class RelacionClientePlanComponent implements OnInit {

 relacionForm: FormGroup;
 clientes: Usuario[] = [];
 planes :Plan[] = [];
 metodosPago: string[] = ['efectivo', 'transferencia', 'getnet'];

 constructor(
  private dialogRef: MatDialogRef<RelacionClientePlanComponent>,
  @Inject(MAT_DIALOG_DATA) public data: { cliente: Usuario },
  private fb: FormBuilder,
  private http: HttpClient,
  private planUsuarioService : PlanUsuarioService,
  private clienteService : ClienteService,
  private planService : PlanService,
  private dateAdapter: DateAdapter<any>
) {
  this.dateAdapter.setLocale('es');
  this.relacionForm = this.fb.group({
    run: [data.cliente.run, Validators.required],
    idPlan: ['', Validators.required],
    nombrePlan: ['', Validators.required],
    nombreUsuario: [data.cliente.primerNombre, Validators.required],
    apellidoUsuario: [data.cliente.paternoApellido, Validators.required],
    fechaRegistroPlan: ['', Validators.required],
    fechaInicio: [dayjs().toDate(), Validators.required],
    fechaFin: ['', Validators.required],
    monto: [0, Validators.required],
    metodoPago: ['', Validators.required],
    descuento: [0, Validators.required],
    mensualidades: [0, Validators.required],
    total: [{ value: 0, disabled: true }] 
  });
  this.relacionForm.get('fechaInicio')?.valueChanges.subscribe(() => this.calculateFechaFin());
    this.relacionForm.get('mensualidades')?.valueChanges.subscribe(() => {
      this.calculateFechaFin();
      this.calculateTotal();
    });
    this.relacionForm.get('monto')?.valueChanges.subscribe(() => this.calculateTotal());
    this.relacionForm.get('descuento')?.valueChanges.subscribe(() => this.calculateTotal());
    this.setFechaRegistroPlan();
  }

  setFechaRegistroPlan() {
    const fechaActual = dayjs().format('DD/MM/YYYY');
    this.relacionForm.patchValue({ fechaRegistroPlan: fechaActual });
  }

calculateFechaFin() {
  const fechaInicio = this.relacionForm.get('fechaInicio')?.value;
  const mensualidades = this.relacionForm.get('mensualidades')?.value;

  if (fechaInicio && mensualidades) {
    const fechaInicioDayjs = dayjs(fechaInicio);
    const fechaFin = fechaInicioDayjs.add(mensualidades, 'month').format('DD/MM/YYYY');
    this.relacionForm.patchValue({ fechaFin });
  }
}

calculateTotal() {
  const monto = this.relacionForm.get('monto')?.value || 0;
  const mensualidades = this.relacionForm.get('mensualidades')?.value || 0;
  const descuento = this.relacionForm.get('descuento')?.value || 0;
  const totalAntesDescuento = monto * mensualidades;
  const totalConDescuento = totalAntesDescuento - (totalAntesDescuento * (descuento / 100));
  this.relacionForm.patchValue({ total: totalConDescuento });
}

myDateFilter = (d: Date | null): boolean => {
  const fechaActual = dayjs().startOf('day');
  return d ? dayjs(d).isSame(fechaActual) || dayjs(d).isAfter(fechaActual) : false;
};

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
