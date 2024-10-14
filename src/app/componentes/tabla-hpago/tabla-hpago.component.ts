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
import dayjs from 'dayjs';
import { MatSelectModule } from '@angular/material/select';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

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
    AppComponent,
    MatSelectModule
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

  desplegarColumna: string[] = ['nombreUsuario', 'nombrePlan', 'monto', 'fecha'];
  dataSource = new MatTableDataSource<Pago>();
  planes: { [key: string]: number } = {};

  months = [
    { value: null, viewValue: 'Todos' },
    { value: 0, viewValue: 'Enero' },
    { value: 1, viewValue: 'Febrero' },
    { value: 2, viewValue: 'Marzo' },
    { value: 3, viewValue: 'Abril' },
    { value: 4, viewValue: 'Mayo' },
    { value: 5, viewValue: 'Junio' },
    { value: 6, viewValue: 'Julio' },
    { value: 7, viewValue: 'Agosto' },
    { value: 8, viewValue: 'Septiembre' },
    { value: 9, viewValue: 'Octubre' },
    { value: 10, viewValue: 'Noviembre' },
    { value: 11, viewValue: 'Diciembre' }
  ];
  selectedMonth: number | null = null;
  totalGananciaMes: number = 0;
  totalGananciaAnual: number = 0;
  

  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private pagoService: PagoService
  ) { }

  ngOnInit(): void {
    this.listarPagos();
    // this.calculateTotalGananciaAnual();
    this.obtenerPagos();

  }

  obtenerPagos() {
    this.pagoService.obtenerPagos().subscribe((pagos: Pago[]) => {
      console.log(pagos); // Verifica aquí el formato de los datos.
      this.pagos = pagos;
      this.calculateTotalGananciaAnual();
    });
  }

  listarPagos(){
    this.pagoService.obtenerPagos().subscribe((data) => {
      this.pagos = data;
      this.dataSource.data = this.pagos;
      // this.calculateTotalGananciaAnual();
    });

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onMonthSelected(event: any) {
    this.selectedMonth = event.value;
    this.calculateTotalGananciaMes();
    this.filtrarPagosPorMes();
  }

  calculateTotalGananciaMes() {
    if (this.selectedMonth !== null) {
      const pagosFiltrados = this.pagos.filter((pago) => {
        const month = new Date(pago.fechaPago).getMonth();
        return month === this.selectedMonth;
      });
      this.totalGananciaMes = pagosFiltrados.reduce((total, pago) => total + pago.monto, 0);
    } else {
      this.totalGananciaMes = 0;
    }
  }

  filtrarPagosPorMes() {
    if (this.selectedMonth !== null) {
      const pagosFiltrados = this.pagos.filter((pago) => {
        const month = new Date(pago.fechaPago).getMonth();
        return month === this.selectedMonth;
      });
      this.dataSource.data = pagosFiltrados;
    } else {
      this.dataSource.data = this.pagos;
    }
  }

  calculateTotalGananciaAnual() {
    if (Array.isArray(this.pagos)) {
      this.totalGananciaAnual = this.pagos.reduce((total, pago) => total + pago.monto, 0);
    } else {
      console.error("this.pagos no es un arreglo");
    }
  }

  formatDate(date: Date): string {
    return dayjs(date).format('DD/MM/YYYY');
  }

  getRowClass(index: number): string {
    return index % 2 === 0 ? 'white-row' : 'alternate-row';
  }

  exportToExcel(): void {
    // Crear una nueva hoja de trabajo
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.pagos.map(pago => ({
      'Nombre de Usuario': pago.nombreUsuario,
      'Nombre del Plan': pago.nombrePlan,
      'Monto': pago.monto,
      'Fecha de Pago': this.formatDate(new Date(pago.fechaPago))
    })));

    // Crear un libro de trabajo y agregar la hoja de trabajo
    const workbook: XLSX.WorkBook = {
      Sheets: { 'Historial de Pagos': worksheet },
      SheetNames: ['Historial de Pagos']
    };

    // Convertir el libro de trabajo a un archivo de Excel binario
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });

    // Crear un Blob a partir del archivo de Excel binario y descargarlo
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'historial_de_pagos.xlsx');
  }
}
