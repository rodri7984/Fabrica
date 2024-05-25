import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
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

@Component({
  selector: 'app-relacion-cliente-plan',
  standalone: true,
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    MatSelectModule
  ],
  templateUrl: './relacion-cliente-plan.component.html',
  styleUrl: './relacion-cliente-plan.component.css'
})
export class RelacionClientePlanComponent implements OnInit {

 relacionForm: FormGroup;
 clientes: Usuario[] = [];

 constructor(
  private dialogRef: MatDialogRef<RelacionClientePlanComponent>,
  private fb: FormBuilder,
  private http: HttpClient,
  private planUsuarioService : PlanUsuarioService,
  private clienteService : ClienteService
) {
  this.relacionForm = this.fb.group({
    run: ['', Validators.required],
    idPlan: ['', Validators.required],
    nombrePlan: ['', Validators.required],
    nombreUsuario: ['', Validators.required],
    apellidoUsuario: ['', Validators.required],
    fechaRegistroPlan: ['', Validators.required],
    fechaInicio: ['', Validators.required],
    fechaFin: ['', Validators.required],
    monto: [0, Validators.required],
    metodoPago: ['', Validators.required],
    descuento: [0, Validators.required]
  });
}


ngOnInit() {
  this.clienteService.getUsuarios().subscribe((data) => {
    this.clientes = data;
  });
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
