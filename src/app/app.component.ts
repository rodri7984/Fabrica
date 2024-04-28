import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {EmpAddEditComponent} from './emp-add-edit/emp-add-edit.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule, MatFormFieldControl} from '@angular/material/form-field';
import { Router } from '@angular/router';
import {MatTableModule, MatTableDataSource} from '@angular/material/table';
import { ClienteService } from './core/services/cliente.service';
import { HttpClient } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import { Usuario } from './usuario';



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

// export interface usuarios {


// }
  // {
  //   "run": "19933184",
  //   "dv": "string",
  //   "primerNombre": "string",
  //   "segundoNombre": "string",
  //   "paternoApellido": "string",
  //   "maternoApellido": "string",
  //   "email": "string",
  //   "fono": 0,
  //   "fechaNacimiento": "string",
  //   "tipoUsuario": "string"
  // }
  // ,
  // {
  //   "run": "19933184",
  //   "dv": "string",
  //   "primerNombre": "string",
  //   "segundoNombre": "string",
  //   "paternoApellido": "string",
  //   "maternoApellido": "string",
  //   "email": "string",
  //   "fono": 0,
  //   "fechaNacimiento": "string",
  //   "tipoUsuario": "string"
  // }];




export class AppComponent implements OnInit{
  usuarios: Usuario[] = [];
  // ELEMENT_DATA = this.mostrarDatos();


  
  title = 'fabricaApp';
  public desplegarColumna : string[] = ['run','dv','primerNombre','paternoApellido','tipoUsuario'];
  dataSource = new MatTableDataSource<Usuario>;
  constructor(private _dialog: MatDialog , private router : Router , private http: HttpClient, private clienteService: ClienteService) {}

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


  mostrarDatos(){
    this.clienteService.getMetodo();
    this.dataSource =this.clienteService.getJsonValue;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
