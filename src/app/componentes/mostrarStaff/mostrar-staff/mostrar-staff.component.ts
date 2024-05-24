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
import { MatInputModule } from '@angular/material/input';import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Colaborador } from '../../../modelos/colaborador';
import { ColaboradorService } from '../../../core/services/colaborador.service';
import { ColaboradorComponent } from '../../form-colaboradores/colaboradores-component.component';


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

  desplegarColumna: string[] = ['nombre','username','rolColaborador','estado'];
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

}
