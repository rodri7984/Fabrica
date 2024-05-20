import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule, MatFormFieldControl } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { ClienteService } from './core/services/cliente.service';
import { HttpClient } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { Usuario } from './usuario';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import dayjs from 'dayjs';




@Component({
  selector: 'app-root',
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
    CommonModule




  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})



export class AppComponent implements OnInit {
date: any;
  editarUsuario(_t68: any) {
    throw new Error('Method not implemented.');
  }
  usuarios: Usuario[] = [];
  title = 'fabricaApp';
  public desplegarColumna: string[] = ['rut', 'primerNombre', 'paternoApellido','inicio', 'vencimiento', 'restantes', 'rolUsuario', 'fechaNacimiento' ];
  dataSource = new MatTableDataSource<Usuario>;

  constructor(private _dialog: MatDialog, private router: Router, private http: HttpClient, private clienteService: ClienteService) { }

  ngOnInit(): void {
    // this.mostrarDatos();
    this.clienteService.getUsuarios().subscribe((data) => {
      this.usuarios = data;

    });
  }

  ngAfterViewInit() {
    this.dataSource = new MatTableDataSource(this.usuarios);
    ;
  }

  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }


  mostrarDatos() {
    this.clienteService.getMetodo();
    this.dataSource = this.clienteService.getJsonValue;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  
   fechaInicial = new Date('2024/05/19');
   fechaInicialFormateada = `${this.fechaInicial.getDate()}/${this.fechaInicial.getMonth() + 1}/${this.fechaInicial.getFullYear()}`;

   mesActual = this.fechaInicial.getMonth();
   siguienteMes = this.mesActual + 1;

   fechaSiguienteMes = new Date(this.fechaInicial);
   fechaUnMes = this.fechaSiguienteMes.setMonth(this.siguienteMes);

   fechaFormateada = `${this.fechaSiguienteMes.getDate()}/${this.fechaSiguienteMes.getMonth() + 1}/${this.fechaSiguienteMes.getFullYear()}`;




diaActual = this.fechaInicial.getDay();
siguienteDia = this.diaActual + 30;

fechaSiguienteDia = new Date(this.fechaInicial);
fechaTreintaDias = this.fechaSiguienteDia.setDate(this.siguienteDia);

AgregarDiasFormateada = `${this.fechaSiguienteDia.getDate()}/${this.fechaSiguienteDia.getMonth() + 1}/${this.fechaSiguienteDia.getFullYear()}`;

fechaIn = dayjs('2024/05/01')
fechaFin = this.fechaIn.add(30, 'days');
today = dayjs(new Date());
fechaDiferencia = this.fechaFin.diff(this.today, 'days')




}


