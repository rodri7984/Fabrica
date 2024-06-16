import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

import { ClienteService } from '../../core/services/cliente.service';
import { Usuario } from '../../usuario';
import { AppComponent } from '../app-root/app.component';
import { formatDate } from '@angular/common';
import { PlanService } from '../../core/services/plan.service';
import { TipoPlan } from '../../modelos/tipo-plan';
import { Location } from '@angular/common';
import { Plan } from '../../modelos/plan';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import dayjs from 'dayjs';
import { CommonModule, registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import utc from 'dayjs/plugin/utc';
import {  FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatMomentDateModule, MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    MatMomentDateModule,
    MatIconModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  metodoEstandar(){
    console.log('funciona');
  }


  // hide = signal(true);
  // clickEvent(event: MouseEvent) {
  //   this.hide.set(!this.hide);
  //   event.stopPropagation();
  // }

}
