import { Routes } from '@angular/router';
import { EmpAddEditComponent } from './componentes/emp-add-edit/emp-add-edit.component';
import { AppComponent } from './componentes/app-root/app.component';
import { MostrarStaffComponent } from './componentes/mostrarStaff/mostrar-staff/mostrar-staff.component';
import { TablaClienteComponent } from './componentes/tabla-cliente/tabla-cliente.component';



export const routes: Routes = [
    // { path: 'inicio', component: EmpAddEditComponent },
    { path: 'home', component: AppComponent },
    { path: 'cliente', component: TablaClienteComponent },
    { path: 'colaboradores', component: MostrarStaffComponent },
    
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  
];
