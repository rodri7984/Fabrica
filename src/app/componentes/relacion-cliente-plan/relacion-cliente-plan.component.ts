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
import { PlanUsuario } from '../../modelos/plan-usuario';

import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

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

  post: PlanUsuario = {
    run: '',
    idPlan: '',
    nombrePlan: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    fechaRegistroPlan: new Date(Date.now()),
    fechaInicio: new Date(Date.now()),
    fechaFin: new Date(Date.now()),
    metodoPago: '',
    descuento: 0,
    mensualidades: 0,
    monto : 0 
  }

  relacionForm: FormGroup;
  clientes: Usuario[] = [];
  planes: Plan[] = [];
  metodosPago: string[] = ['efectivo', 'transferencia', 'getnet'];
  valorPorMes: number = 0;

  constructor(
    private dialogRef: MatDialogRef<RelacionClientePlanComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { cliente: Usuario },
    private fb: FormBuilder,
    private http: HttpClient,
    private planUsuarioService: PlanUsuarioService,
    private clienteService: ClienteService,
    private planService: PlanService,
    private dateAdapter: DateAdapter<any>
  ) {
    this.dateAdapter.setLocale('es');
    this.relacionForm = this.fb.group({
      run: [data.cliente.run, Validators.required],
      idPlan: ['', Validators.required],
      nombrePlan: ['', Validators.required],
      nombreUsuario: [data.cliente.primerNombre, Validators.required],
      apellidoUsuario: [data.cliente.paternoApellido, Validators.required],
      fechaRegistroPlan: [dayjs().toDate(), Validators.required],
      fechaInicio: [dayjs().toDate(), Validators.required],
      fechaFin: [dayjs().toDate(), Validators.required],
      metodoPago: ['', Validators.required],
      descuento: [0, Validators.required],
      mensualidades: [0, Validators.required],
      monto: [0, Validators.required]
    });

    this.relacionForm.get('fechaInicio')?.valueChanges.subscribe(() => this.calculateFechaFin());
    this.relacionForm.get('mensualidades')?.valueChanges.subscribe(() => {
      this.calculateFechaFin();
      this.calculateTotal();
    });
    this.relacionForm.get('descuento')?.valueChanges.subscribe(() => this.calculateTotal());
  }

  calculateFechaFin() {
    const fechaInicio = this.relacionForm.get('fechaInicio')?.value;
    const mensualidades = this.relacionForm.get('mensualidades')?.value;

    if (fechaInicio && mensualidades) {
      const fechaInicioDayjs = dayjs(fechaInicio);
      const fechaFin = fechaInicioDayjs.add(mensualidades, 'month').format('YYYY-MM-DD');
      this.relacionForm.patchValue({ fechaFin });
    }
  }

  calculateTotal() {
    const mensualidades = this.relacionForm.get('mensualidades')?.value || 0;
    const descuento = this.relacionForm.get('descuento')?.value || 0;
    const totalAntesDescuento = this.valorPorMes * mensualidades;
    const totalConDescuento = totalAntesDescuento - (totalAntesDescuento * (descuento / 100));
    this.relacionForm.patchValue({ monto: totalConDescuento });
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
    this.calculateTotal(); // Calcular el total inicialmente
  }

  onPlanChange(selectedPlanName: string) {
    const selectedPlan = this.planes.find(plan => plan.nombrePlan === selectedPlanName);
    if (selectedPlan) {
      this.valorPorMes = selectedPlan.valorPlan; // Actualizar valor por mes
      this.relacionForm.patchValue({
        idPlan: selectedPlan.idPlan,
        nombrePlan: selectedPlan.nombrePlan
      });
      this.calculateTotal(); // Recalcular el total cuando cambia el plan
    }
  }

  obtenerFechaActual(): Date {
    return new Date(); // Devuelve la fecha actual
  }

  formatearFecha(fecha: Date): string {
    return dayjs(fecha).utc().format(); // Formato ISO 8601
  }

  postRelacion() {
    if (this.relacionForm.valid) {
      const formValue = this.relacionForm.value;

      // Convertir las fechas al formato correcto
      const fechaRegistroPlan = dayjs(formValue.fechaRegistroPlan).format('YYYY-MM-DD');
      const fechaInicio = dayjs(formValue.fechaInicio).format('YYYY-MM-DD');
      const fechaFin = dayjs(formValue.fechaFin).format('YYYY-MM-DD');

      const envio = {
        ...formValue,
        fechaRegistroPlan,
        fechaInicio,
        fechaFin
      };

      console.log('Datos enviados:', envio); // Verifica aquí que monto no sea undefined

      this.planUsuarioService.agregarPlanUsuario(envio).subscribe(
        (response) => {
          console.log('Relacion guardada exitosamente:', response);
          // Actualizar el atributo tienePlan del usuario
          this.clienteService.actualizarUsuario(formValue.run, { tienePlan: true }).subscribe(
            (userResponse) => {
              console.log('Usuario actualizado exitosamente:', userResponse);
            },
            (userError) => {
              console.error('Error al actualizar el usuario:', userError);
            }
          );
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
