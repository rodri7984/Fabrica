import { Component, OnInit } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { ClienteService } from '../core/services/cliente.service';


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
export class EmpAddEditComponent implements OnInit  {
  
  empForm = new FormGroup({
    nombre: new FormControl(''),
    apellido: new FormControl(''),
    run: new FormControl(''),
    dv: new FormControl(''),
    plan: new FormControl(''),
    fpago: new FormControl(''),
    fInicio: new FormControl(''),
  })

  users = [];
  constructor(private userService : ClienteService) {}
  ngOnInit () {
  
  this.userService.getclienteList().subscribe(cliente =>{
    this.users = cliente;
  });
}



onFormSubmit(){
    if(this.empForm.valid){
      console.log(this.empForm.value)
      console.log(this.users)
    }
    
  }


}
