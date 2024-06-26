import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
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
import { PlanUsuario } from '../../modelos/plan-usuario';
import { PlanUsuarioService } from '../../core/services/plan-usuario.service';


@Component({
  selector: 'app-tabla-planes-usuario',
  standalone: true,
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
    RouterModule, AppComponent],
  templateUrl: './tabla-planes-usuario.component.html',
  styleUrl: './tabla-planes-usuario.component.css'
})
export class TablaPlanesUsuarioComponent {

  planUsers: PlanUsuario[] = [];
  title = 'tabla planesUsuario';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }
  
  desplegarColumna: string[] = [ 'run','nombreUsuario', 'nombrePlan',  'fechaInicio','fechaFin','mensualidades','monto','diasRestantes'];
  dataSource = new MatTableDataSource<PlanUsuario>();
  
  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private clienteService: ClienteService,
    private planUsuarioService: PlanUsuarioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.planUsuarioService.obtenerPlanUsuario().subscribe((data) => {
      this.planUsers = data;
      this.dataSource.data = this.planUsers; // Asegúrate de actualizar la dataSource aquí
      this.cdr.detectChanges();
    });
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }

  openColaborador() {
    this._dialog.open(ColaboradorComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDate(date: string | Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  calcularDiferencia(date: Date): number {
    const today = dayjs(new Date());
    const masUnMes = dayjs(date).add(30, 'days');
    return masUnMes.diff(today, 'days');
  }

getColor(diasTotal: number): string {
  if (diasTotal >= 22 && diasTotal <= 31) return '#bee3ba';
  if (diasTotal >= 7 && diasTotal <= 21) return '#fffeba';
  if (diasTotal >= 1 && diasTotal <= 6) return 'rgba(255, 166, 0, 0.911)';
  if (diasTotal <= 0) return '#db4040';
  return 'black';
}

getRowClass(index: number): string {
  return index % 2 === 0 ? 'white-row' : 'alternate-row';
}
}
// getColor(diasTotal: number): string {
//   if (diasTotal >= 15 && diasTotal <= 30) return '#92D86B';
//   if (diasTotal >= 7 && diasTotal <= 14) return '#EDD661';
//   if (diasTotal >= 1 && diasTotal <= 6) return 'orange';
//   if (diasTotal <= 0) return '#C4534E';
//   return 'black';
// }