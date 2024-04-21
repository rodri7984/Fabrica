import { Routes } from '@angular/router';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { AppComponent } from './app.component';


export const routes: Routes = [
    { path: 'inicio', component: EmpAddEditComponent },
    { path: 'home', component: AppComponent },
];
