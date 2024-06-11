import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../usuario';
import { HttpClient } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../core/services/cliente.service';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-editar-cliente',
  standalone: true,
  providers : [provideNativeDateAdapter()],
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatInputModule
  ],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent implements OnInit {

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe((data) => {
      this.usuarios = data
    });
    if (this.data.usuario) {
      this.relacionForm.patchValue(this.data.usuario);
    }

  }

  relacionForm: FormGroup;
  usuarios: Usuario[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { usuario: Usuario },
    private fb: FormBuilder,
    private http: HttpClient,
    private usuarioService: ClienteService,
    private dialogRef: MatDialogRef<EditarClienteComponent>
  ) {
    this.relacionForm = this.fb.group({
      primerNombre: ['', Validators.required],
      segundoNombre: [''], // Sin validadores para el segundo nombre
      paternoApellido: ['', Validators.required],
      maternoApellido: [''],
      run: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(8)]],
      dv: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^[0-9kK]$/)]],
      email: ['', [Validators.email]],
      fono: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
      fechaNacimiento: [, [Validators.required]],
      fechaRegistro: [, Validators.required],
      // fechaRegistro: [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), Validators.required],
      estado: [""],
      tienePlan: [],
    });

  }


  onSubmit(): void {
    if (this.relacionForm.valid) {
      const planActualizado: Usuario = {
        ...this.data.usuario,
        ...this.relacionForm.getRawValue(),

      };
      this.usuarioService.actualizarCliente(planActualizado).subscribe(response => {
        console.log('Cliente actualizado:', response);
        this.dialogRef.close(true); // Cierra el diálogo y devuelve un valor verdadero
      }, error => {
        console.error('Error al actualizar el cliente:', error);
      });
    }
  }











}
