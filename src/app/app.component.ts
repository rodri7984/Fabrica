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
export class AppComponent implements OnInit{
  title = 'fabricaApp';
  public desplegarColumna : string[] = ['run','dv','primerNombre','paternoApellido','tipoUsuario'];
  dataSource = new MatTableDataSource();
  constructor(private _dialog: MatDialog , private router : Router , private http: HttpClient, private clienteService: ClienteService) {}

  ngOnInit(): void {
    this.mostrarDatos()
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
