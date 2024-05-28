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
import { AppComponent } from '../app-root/app.component';
import { formatDate } from '@angular/common';
import { PlanService } from '../../core/services/plan.service';
import { TipoPlan } from '../../modelos/tipo-plan';
import { Location } from '@angular/common';
import { Plan } from '../../modelos/plan';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import dayjs from 'dayjs';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc); 
registerLocaleData(localeEs, 'es');

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
    tienePlan: false,
 
  }


  tipo: Usuario[] = [];


  idsPlanes: string[] = [];
  selectedPlanId: string = '';


  editForm!: FormGroup;
  // empForm! : FormGroup;
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
    fechaNacimiento: [this.post.fechaNacimiento, [Validators.required]],
    fechaRegistro:  [ this.post.fechaRegistro , Validators.required],
    // fechaRegistro: [formatDate(this.post.fechaNacimiento, 'yyyy-MM-dd', 'en'), Validators.required],
    estado: ["ACTIVO"],
    tienePlan: [this.post.tienePlan],
  });

  obtenerFechaActual(): Date {
    return new Date(); // Devuelve la fecha actual
  }


  formatearFecha(fecha: Date): string {
    return dayjs(fecha).utc().format(); // Formato ISO 8601
  }

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
      const formValue = this.empForm.value;

      const fechaNacimiento = formValue.fechaNacimiento ? this.formatearFecha(new Date(formValue.fechaNacimiento)) : null;
      const fechaRegistro = formValue.fechaRegistro ? this.formatearFecha(new Date(formValue.fechaRegistro)) : this.formatearFecha(this.obtenerFechaActual());

      const envio = {
        ...formValue,
        fechaNacimiento,
        fechaRegistro
      };

      console.log('Datos enviados:', envio); // Log para verificar los datos enviados

      this.clienteService.agregarUsuario(envio).subscribe(
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