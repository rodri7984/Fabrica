import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
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
import { RouterModule } from '@angular/router';
import { AppComponent } from '../app-root/app.component';



@Component({
    selector: 'app-tabla-cliente',
    standalone: true,
    templateUrl: './tabla-cliente.component.html',
    styleUrl: './tabla-cliente.component.css',
    imports: [RouterOutlet,
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
        RouterModule, AppComponent]
})
export class TablaClienteComponent implements OnInit {
  usuarios: Usuario[] = [];
  title = 'tabla cliente';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }
  desplegarColumna: string[] = ['rut', 'primerNombre', 'paternoApellido', 'fechaRegistro', 'fechaRegistro2'];
  dataSource = new MatTableDataSource<Usuario>();
  planes: { [key: string]: number } = {};

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private clienteService: ClienteService,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    this.clienteService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
      this.dataSource.data = this.usuarios; // Asegúrate de actualizar la dataSource aquí
    });

    this.planService.obtenerPlanesDesdeAPI().subscribe((planes: any[]) => {
      console.log("Planes obtenidos desde la API:", planes);
      this.planes = planes.reduce<{ [key: string]: number }>((acc, plan) => {
        acc[plan.idPlan] = plan.valorPlan;
        return acc;
      }, {});
      console.log("Objeto planes mapeado:", this.planes);
    });
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }

  openColaborador() {
    this._dialog.open(ColaboradorComponent);
  }

  calcularDiferencia(date: Date): number {
    const today = dayjs(new Date());
    const masUnMes = dayjs(date).add(30, 'days');
    return masUnMes.diff(today, 'days');
  }

  getColor(diasTotal: number): string {
    if (diasTotal >= 15 && diasTotal <= 30) return 'green';
    if (diasTotal >= 7 && diasTotal <= 14) return 'yellow';
    if (diasTotal >= 1 && diasTotal <= 6) return 'orange';
    if (diasTotal <= 0) return 'red';
    return 'black';
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDate(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  getPrecioPlan(idPlan: string): number {
    // console.log("Obteniendo precio para el plan:", idPlan, "Valor:", this.planes[idPlan]);
    return this.planes[idPlan] || 0;
  }

  editarUsuario(_t68: any) {
    throw new Error('Method not implemented.');
  }
}
