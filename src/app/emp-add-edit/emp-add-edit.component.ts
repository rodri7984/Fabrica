import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { ClienteService } from '../core/services/cliente.service';
import { Usuario } from '../usuario';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../app.component';
import { formatDate } from '@angular/common';
import { PlanService } from '../core/services/plan.service';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
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
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent    {

  post: Usuario = {
    fechaNacimiento: new Date(Date.now()),
    fechaRegistro: new Date(Date.now()),
    run: '',
    digitoVUser: '',
    primerNombre: '',
    segundoNombre: '',
    paternoApellido: '',
    maternoApellido: '',
    email: '',
    fono: null,
    rolUsuario: '',
    estado: '',
    descuento: null
  }


  tipo: Usuario[] = [];
  //  usuario: Usuario = new Usuario('0', '','th', '', '', '', '', null, '', 'Clienteeee');
 
  //  tipoUsuarioSeleccionado = [
  //   {tipo :'Staff'},
  //   {tipo :'Cliente'},
  //  ];

    tipoUsuarioSeleccionado2 : string[] = ['CLIENTE', 'STAFF','ADMIN'];


    // selectorElegido : string = '';

    onTipoUsuarioSelectionChange(event: any) {
      const selectedValue = event.value; // Valor seleccionado (por ejemplo, 'staff' o 'cliente')
      this.empForm.get('rolUsuario')?.setValue(selectedValue); // Actualiza el valor en el FormGroup
    }
  
    editForm!: FormGroup;

  constructor(
    private fb: FormBuilder, 
    private clienteService: ClienteService, 
    private router: Router, 
    private PlanService : PlanService) {}
 


  empForm = this.fb.group({
    primerNombre: ['', Validators.required],
    segundoNombre: ['', Validators.required],
    paternoApellido: ['', Validators.required],
    maternoApellido: ['', Validators.required],
    run: ['', Validators.required],
    dv: ['', Validators.required],
    email: ['', Validators.required,],
    fono: [null, Validators.required],
    fechaNacimiento: [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), [Validators.required]],
    rolUsuario : ['0'],
    estado: ["ACTIVO"],
    fechaRegistro : [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), Validators.required]
    
  });




  mostrarFormulario: boolean = true; // Inicialmente, el formulario se muestra


  guardarDatos() {
    if (this.empForm.valid) {
      // Si el formulario es válido, crea un objeto con los datos del formulario

      // Llama al método agregarUsuario del servicio para guardar los datos
      this.clienteService.agregarUsuario(this.empForm.value).subscribe(
        (response) => {
          console.log('Usuario guardado exitosamente:', response);
          console.log('rut:', this.empForm.value);
          

        },
        (error) => {
          console.error('Error al guardar el usuario:', error);

        }
      );
    } else {
      console.warn('El formulario no es válido. Verifica los campos.');
    }
  }

  cancelar(): void {
    // Realiza cualquier acción necesaria antes de redirigir
    // Por ejemplo, cerrar el formulario o limpiar datos

    // Redirige a la página principal
    this.router.navigate(['/home']); // Cambia '/' por la ruta correcta de tu página principal
    // Oculta el formulario
    this.mostrarFormulario = false;
  }

}