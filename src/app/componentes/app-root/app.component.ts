import { Component, EventEmitter, Output, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { ColaboradorComponent } from '../form-colaboradores/colaboradores-component.component';
import { TablaClienteComponent } from '../tabla-cliente/tabla-cliente.component';
import { MostrarStaffComponent } from '../mostrarStaff/mostrar-staff/mostrar-staff.component';
import { TablaPlanesUsuarioComponent } from "../tabla-planes-usuario/tabla-planes-usuario.component";
import { ReactiveFormsModule } from '@angular/forms';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { TablaPlanComponent } from "../tabla-plan/tabla-plan.component";




@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatDialogModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
        CommonModule,
        MatSidenavModule,
        MatListModule,
        RouterModule, TablaClienteComponent, MostrarStaffComponent,
        TablaPlanesUsuarioComponent,
        EmpAddEditComponent, TablaPlanComponent]
})
export class AppComponent {
  toggleSidenav = new EventEmitter<void>();
sidenavv!: MatSidenav;
 
  title = 'fabrica';
  
  activeComponent: 'cliente' | 'staff' | 'planesUsuario' | 'EmpAddEditComponent' | 'plan' | null = null;
 




 constructor( private _dialog: MatDialog) { }


 showClienteDashboard() {
  this.activeComponent = 'cliente';
}

showStaffDashboard() {
  this.activeComponent = 'staff';
}

showplanesUsuarioDashboard() {
  this.activeComponent = 'planesUsuario';
}

showpEmpAddEditComponent() {
  this.activeComponent = 'EmpAddEditComponent';
  this._dialog.open(EmpAddEditComponent);
}
 onToggleSidenav(): void {
   this.toggleSidenav.emit();
 }

 closeSidenav() {
   this.sidenavv.close();
 }
 openAddEditEmpForm() {
  this._dialog.open(EmpAddEditComponent);
}

openColaborador() {
  this._dialog.open(ColaboradorComponent);
}

showPLanDashboard(){
  this.activeComponent = 'plan';
}

}
