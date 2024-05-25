import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AppComponent } from '../app-root/app.component';
import { Pago } from '../../modelos/pago';
import { HttpClient } from '@angular/common/http';
import { ClienteService } from '../../core/services/cliente.service';
import { PagoService } from '../../core/services/pago.service';

@Component({
  selector: 'app-tabla-hpago',
  standalone: true,
  imports: [RouterOutlet,
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
    RouterModule,
    AppComponent
  ],
  templateUrl: './tabla-hpago.component.html',
  styleUrl: './tabla-hpago.component.css'
})
export class TablaHPagoComponent implements OnInit {
    pagos: Pago[] = [];
    title = 'tabla Historial pagos';
  
    @ViewChild('sidenav') sidenav!: MatSidenav;
  
    closeSidenav() {
      this.sidenav.close();
    }

    desplegarColumna: string[] = ['run', 'idPlan'];
  dataSource = new MatTableDataSource<Pago>();
  planes: { [key: string]: number } = {};

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.pagoService.obtenerPagos().subscribe((data) => {
      this.pagos = data;
      this.dataSource.data = this.pagos;
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
