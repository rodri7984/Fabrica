import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl, Validators, FormsModule } from '@angular/forms';
import { ClienteService } from '../../core/services/cliente.service';
import { Usuario } from '../../usuario';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AppComponent } from '../mostrarClientes/app.component';
import { formatDate } from '@angular/common';
import { PlanService } from '../../core/services/plan.service';
import { TipoPlan } from '../../modelos/tipo-plan';
import { Location } from '@angular/common';
import { Plan } from '../../modelos/plan';





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
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule

  ],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.css'
})
export class EmpAddEditComponent {

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
    estado: '',
    idTipoPlan: '',
    descuento: 0
  }


  tipo: Usuario[] = [];


  tipoUsuarioSeleccionado2: string[] = ['CLIENTE', 'STAFF'];
  mesesAPagar : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  idsPlanes: string[] = [];
  selectedPlanId: string = '';
  onPlanSelectionChange(event: any) {
    this.selectedPlanId = event.value; // Actualiza el valor seleccionado
    this.empForm.get('idTipoPlan')?.setValue(this.selectedPlanId); // Actualiza el valor en el 
  }
  

  onTipoUsuarioSelectionChange(event: any) {
    const selectedValue = event.value; // Valor seleccionado (por ejemplo, 'staff' o 'cliente')
    this.empForm.get('descuento')?.setValue(selectedValue); // Actualiza el valor en el FormGroup
  }

  // onmesesAPagarSelectionChange(event: any) {
  //   const selectedValue = event.value; // Valor seleccionado (por ejemplo, 'staff' o 'cliente')
    
  // }

  editForm!: FormGroup;
  nombresPlanes: any[] = [];
  constructor(private fb: FormBuilder, private clienteService: ClienteService, private router: Router,
    public _location : Location, private planService : PlanService
  ) { }



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
    fechaRegistro: [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), Validators.required],
    estado: ["ACTIVO"],
    idTipoPlan : ['', Validators.required],
    descuento : [0, Validators.required]

  });


  // ngOnInit() {
  //   this.PlanService.obtenerPlanesDesdeAPI().subscribe((planes) => {
  //     this.idsPlanes = planes.map((plan) => plan.nombrePlan);
  //   });
  // }

  ngOnInit(): void {

    this.planService.obtenerPlanesDesdeAPI().subscribe((planes: any[]) => {
      // Filtra solo los nombres de los planes
      this.nombresPlanes = planes.map(plan => plan.nombrePlan);
    });
  }

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

  refrescar(): void {

    window.location.reload();
    }
  



  // metodos y variables para obtener un get de los planes

  tiposDePlan: Plan[] = [];

  dataSource: any;

  traerPlanes() {


    this.planService.getPLanes().subscribe((data) => {
      this.tiposDePlan = data;

    });



  }
}