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
import { ReplaySubject } from 'rxjs';




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
    MatInputModule




  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  usuarios: Usuario[] = [];



  title = 'fabricaApp';
  public desplegarColumna: string[] = ['run', 'dv', 'primerNombre', 'paternoApellido', 'tipoUsuario'];
  dataSource = new MatTableDataSource<Usuario>;

  constructor(private _dialog: MatDialog, private router: Router, private http: HttpClient, private clienteService: ClienteService) { }

  concatMetodo() {

  }


  // public desplegarColumna2: string[] = [this.rut,  'primerNombre', 'paternoApellido', 'tipoUsuario'];

  ngOnInit(): void {
    this.mostrarDatos()
    this.clienteService.getUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  // let rut = 

  // intento de combinar run y digito verificador
  // rut = 


  openAddEditEmpForm() {
    this._dialog.open(EmpAddEditComponent);
  }


  mostrarDatos() {
    this.clienteService.getMetodo();
    this.dataSource = this.clienteService.getJsonValue;

  }


  // supongo que esto es el filtro
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
