import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ClienteService } from '../../core/services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from '../../usuario';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { ColaboradorComponent } from '../form-colaboradores/colaboradores-component.component';
import { PlanService } from '../../core/services/plan.service';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { AppComponent } from '../app-root/app.component';
import { RelacionClientePlanComponent } from '../relacion-cliente-plan/relacion-cliente-plan.component';

@Component({
    selector: 'app-tabla-cliente',
    standalone: true,
    templateUrl: './tabla-cliente.component.html',
    styleUrls: ['./tabla-cliente.component.css'],
    imports: [
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        EmpAddEditComponent,
        MatDialogModule,
        MatFormFieldModule,
        MatTableModule,
        MatInputModule,
        CommonModule,
        MatSidenavModule,
        MatListModule,
        AppComponent
    ]
})
export class TablaClienteComponent implements OnInit {
    usuarios: Usuario[] = [];
    title = 'tabla cliente';
    desplegarColumna: string[] = ['rut', 'primerNombre', 'paternoApellido', 'fechaNacimiento', 'fechaRegistro', 'fono', 'acciones'];
    dataSource = new MatTableDataSource<Usuario>();
    planes: { [key: string]: number } = {};

    constructor(
        private _dialog: MatDialog,
        private clienteService: ClienteService,
        private planService: PlanService
    ) { }

    listarUsuarios() {
        this.clienteService.getUsuarios().subscribe((data) => {
            this.usuarios = data;
            this.dataSource.data = this.usuarios;
        });

        this.planService.obtenerPlanesDesdeAPI().subscribe((planes: any[]) => {
            this.planes = planes.reduce<{ [key: string]: number }>((acc, plan) => {
                acc[plan.idPlan] = plan.valorPlan;
                return acc;
            }, {});
        });
    }

    ngOnInit(): void {
        this.listarUsuarios();
    }

    showEmpAddEditComponent() {
        const dialogRef = this._dialog.open(EmpAddEditComponent);
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.listarUsuarios(); // Actualiza la lista de clientes cuando se agrega uno nuevo
            }
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    formatDate(date: Date): string {
        return dayjs(date).format('DD/MM/YYYY');
    }

    relacionarPlan(cliente: Usuario) {
        const dialogRef = this._dialog.open(RelacionClientePlanComponent, {
            width: '500px',
            data: { cliente }
        });
    }
}
