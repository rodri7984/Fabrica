import { CommonModule } from "@angular/common";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatSidenav, MatSidenavModule } from "@angular/material/sidenav";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { Router, RouterModule, RouterOutlet } from "@angular/router";
import { AppComponent } from "../app-root/app.component";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Plan } from "../../modelos/plan";
import { HttpClient } from "@angular/common/http";
import { PlanService } from "../../core/services/plan.service";


@Component({
  selector: 'app-tabla-plan',
  standalone: true,
  templateUrl: './tabla-plan.component.html',
  styleUrl: './tabla-plan.component.css',
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
    RouterModule,
     AppComponent]

    
  

})
export class TablaPlanComponent implements OnInit{
  planes: Plan[] = [];
  title = 'tabla plan';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }
  desplegarColumna: string[] = ['idPlan','nombrePlan','valorPlan'];
  dataSource = new MatTableDataSource<Plan>();


  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    this.planService.obtenerPlanesDesdeAPI().subscribe((data) => {
      this.planes = data;
      this.dataSource.data = this.planes; // Asegúrate de actualizar la dataSource aquí
    });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

}
