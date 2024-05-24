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
import { AppComponent } from '../app-root/app.component';
import { formatDate } from '@angular/common';
import { PlanService } from '../../core/services/plan.service';
import { TipoPlan } from '../../modelos/tipo-plan';
import { Location } from '@angular/common';
import { Plan } from '../../modelos/plan';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';





@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,

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
 
  }


  tipo: Usuario[] = [];


  tipoUsuarioSeleccionado2: string[] = ['CLIENTE', 'STAFF'];
  mesesAPagar : number[] = [1,2,3,4,5,6,7,8,9,10,11,12];
  idsPlanes: string[] = [];
  selectedPlanId: string = '';

  
  // onPlanSelectionChange(event: any) {
  //   this.selectedPlanId = event.value; // Actualiza el valor seleccionado
  //   this.empForm.get('idTipoPlan')?.setValue(this.selectedPlanId); // Actualiza el valor en el 
  // }
  

  // onTipoUsuarioSelectionChange(event: any) {
  //   const selectedValue = event.value; // Valor seleccionado (por ejemplo, 'staff' o 'cliente')
  //   this.empForm.get('descuento')?.setValue(selectedValue); // Actualiza el valor en el FormGroup
  // }

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
    segundoNombre: [''], // Sin validadores para el segundo nombre
    paternoApellido: ['', Validators.required],
    maternoApellido: ['', Validators.required],
    run: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
    dv: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(1), Validators.pattern(/^[0-9kK]$/)]],
    email: ['', [Validators.required, Validators.email]],
    fono: [null, [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
    fechaNacimiento: [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), [Validators.required]],
    fechaRegistro: [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), Validators.required],
    estado: ["ACTIVO"]
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