import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input'; import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Colaborador } from '../../../modelos/colaborador';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { ColaboradorComponent } from '../../form-colaboradores/colaboradores-component.component';
// import { RelacionActividadColaboradorComponent } from '../../../relacion-actividad-colaborador/relacion-actividad-colaborador.component';
import { escape } from 'querystring';

@Component({
  selector: 'app-mostrar-staff',
  standalone: true,
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    RouterModule
  ],
  templateUrl: './mostrar-staff.component.html',
  styleUrl: './mostrar-staff.component.css'
})
export class MostrarStaffComponent {
  usuarios: Colaborador[] = [];
  title = 'Dashboard colaboradores';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }

  desplegarColumna: string[] = ['nombre', 'username', 'rolColaborador', 'estado', 'acciones'];
  dataSource = new MatTableDataSource<Colaborador>();
  // planes: { [key: string]: number } = {};

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private colaboradorService: ColaboradorService,

  ) { }
  ngOnInit(): void {
    this.colaboradorService.obtenercolaboradorDesdeAPI().subscribe((data) => {
      this.usuarios = data;
      this.dataSource.data = this.usuarios; // Asegúrate de actualizar la dataSource aquí
    });
  }

  openColaborador() {
    this._dialog.open(ColaboradorComponent);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  // cambiarEstado(staff: Colaborador) {
  //   console.log(staff);
  //   console.log('...');
  //   if (staff.estado === "ACTIVO") {
  //     return this.colaboradorService.cambiarEstadoColaborador(staff.username, "INACTIVO");
  //   } else {
  //     return this.colaboradorService.cambiarEstadoColaborador(staff.username, "ACTIVO");

  //   }
  // }

  // changeEstado(staff: Colaborador) {
  //   console.log('...');
  //   console.log(staff);
  //   return this.colaboradorService.cambiarEstadoColaborador(staff.username, "INACTIVO");
  //   console.log('pasa por aqui porfin');
  //   return console.log(staff);
  // }

  changeEstado(staff: Colaborador) {
    if (staff.estado === "ACTIVO") {
      return this.colaboradorService.changeEstadoColab(staff.username, "INACTIVO")
        .subscribe(response => {
          console.log('Estado del colaborador actualizado:', response);
        }, error => {
          console.error('Error al actualizar el estado del colaborador:', error);
        });
        
    } else {
      return this.colaboradorService.changeEstadoColab(staff.username, "ACTIVO")
        .subscribe(response => {
          console.log('Estado del colaborador actualizado:', response);
        }, error => {
          console.error('Error al actualizar el estado del colaborador:', error);
        });
    }
  }

}
