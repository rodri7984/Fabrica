import { Component } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';


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
  empForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    rut: new FormControl(''),
    plan: new FormControl(''),
    fpago: new FormControl(''),
    fInicio: new FormControl(''),
  })



onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value)
    }
    
  }
}
