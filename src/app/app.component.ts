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
  public desplegarColumna: string[] = ['rut', 
  'primerNombre',
   'paternoApellido',
   
     
    'fechaRegistro',
    'fechaRegistro2'];
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

    // ???
    this.dataSource.data.forEach((usuario) => {
      const fechaNacimientoFormatted = dayjs(usuario.fechaNacimiento).format('YYYY-MM-DD'); // Cambia el formato según tus necesidades
      usuario.fechaNacimiento = new Date(fechaNacimientoFormatted);    });

  }
  today = dayjs(new Date());



  calcularDiferencia(date: Date): number {
    this.today = dayjs(new Date());
    const masUnMes = dayjs(date).add(30, 'days');
    const fechaCalculada = dayjs(masUnMes).diff(this.today, 'days');
    
    console.log('fecha normal :', dayjs(date).format('DD/MM/YYYY'));
    console.log('fecha registro + 30 :', dayjs(date).add(30, 'days').format('DD/MM/YYYY')); 
    console.log('numero de dias:', fechaCalculada);
    
    return fechaCalculada;
  }


  getColor(diasTotal: number): string {
    if (diasTotal >= 15 && diasTotal <= 30) {
      return 'green';
    } else if (diasTotal >= 7 && diasTotal <= 14) {
      return 'yellow';
    } else if (diasTotal >= 1 && diasTotal <= 6) {
      return 'orange';
    } else if (diasTotal <= 0) {
      return 'red';
    } else {
      return 'black'; // Default color if the number doesn't fall into any range
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  formatDate(date: Date): string {
    // Implementa tu lógica de formato de fecha aquí
    // Por ejemplo, usando day.js:
    return dayjs(date).format('DD/MM/YYYY');
    // return date.toISOString(); // Formato ISO 8601
  }
  


fechaIn = dayjs('2024/05/01')
fechaFin = this.fechaIn.add(30, 'days');

fechaDiferencia = this.fechaFin.diff(this.today, 'days')




}


