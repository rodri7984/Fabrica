import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators  } from '@angular/forms';
import { ClienteService } from '../core/services/cliente.service';
import { Usuario } from '../usuario';



@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
            MatInputModule,
            MatSelectModule,
            MatDatepickerModule,
            MatNativeDateModule,
            MatButtonModule,
          ReactiveFormsModule
        ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent {



  empForm: FormGroup; // Define el FormGroup para tu formulario

  constructor(private fb: FormBuilder, private clienteService: ClienteService )
    {
    // Inicializa el formulario con los campos y validadores necesarios
    this.empForm = this.fb.group({
      nombre: [this.usuario.primerNombreUser],
      Snombre: [this.usuario.segundoNombreUser],
      apellido: [this.usuario.paternoApellidoUser],
      apellidoM: [this.usuario.maternoApellidoUser],
      run: [this.usuario.runUser ],
      dv: [this.usuario.digitoVUser ],
      mail: [this.usuario.correoElectronicoUser ],
      telefono: [this.usuario.telefonoUser],
      Fnac : [this.usuario.fechaNacimientoUser],
      tipoUser : [this.usuario.tipoUser]
    });
  }

  usuario: Usuario = new Usuario(1,'22', 'John', 'Carlos', 'Perez', 'Gonzales', 'juan@example.com', 987654321, '1990-05-15', 'Cliente');
  

  guardarDatos() {
    if (this.empForm.valid) {
      // Si el formulario es válido, crea un objeto con los datos del formulario
      this.usuario

      // Llama al método agregarUsuario del servicio para guardar los datos
      this.clienteService.agregarUsuario(this.usuario).subscribe(
        (response) => {
          console.log('Usuario guardado exitosamente:', response);
          // Puedes redirigir a otra página o mostrar un mensaje de éxito aquí
        },
        (error) => {
          console.error('Error al guardar el usuario:', error);
          // Maneja el error según tus necesidades
        }
      );
    } else {
      console.warn('El formulario no es válido. Verifica los campos.');
    }
  }
}