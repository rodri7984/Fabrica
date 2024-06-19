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
import { FormAddPlanComponent } from "../form-add-plan/form-add-plan.component";
import { DesactivarPlanComponent } from "../desactivar-plan/desactivar-plan.component";
import { EditarPlanComponent } from "../editar-plan/editar-plan.component";


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
     AppComponent,
     FormAddPlanComponent
    ]
})
export class TablaPlanComponent implements OnInit{
  planes: Plan[] = [];
  title = 'tabla plan';
  desplegarColumna: string[] = ['idPlan','nombrePlan','valorPlan', 'estado','acciones','editar'];
  dataSource = new MatTableDataSource<Plan>();

  @ViewChild('sidenav') sidenav!: MatSidenav;

  closeSidenav() {
    this.sidenav.close();
  }


  constructor(
    private _dialog: MatDialog,
    private router: Router,
    private http: HttpClient,
    private planService: PlanService
  ) { }

  ngOnInit(): void {
    this.listarPlanes();
}

listarPlanes(){
  this.planService.obtenerPlanesDesdeAPI().subscribe((data) => {
    this.planes = data;
    this.dataSource.data = this.planes; // Asegúrate de actualizar la dataSource aquí
  });
}

showFormAddPlanComponent() {
  const dialogRef = this._dialog.open(FormAddPlanComponent);
  dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.listarPlanes(); 
      }
  });
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

FormAddPlan(cliente: FormAddPlanComponent) {
  const dialogRef = this._dialog.open(FormAddPlanComponent, {
    width: '500px',
    data: { cliente }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.listarPlanes(); 
    }
  });
}

ShowDesactivarPlan(plan: Plan) {
  const dialogRef = this._dialog.open(DesactivarPlanComponent, {
    width: '500px',
    data: { plan }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.listarPlanes(); // Actualiza la lista de clientes cuando se relaciona un plan
    }
  });
}

showEditarPlan(plan: Plan) {
  const dialogRef = this._dialog.open(EditarPlanComponent, {
    width: '500px',
    data: { plan }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.listarPlanes(); // Actualiza la lista de clientes cuando se relaciona un plan
    }
  });
}

getRowClass(index: number): string {
  return index % 2 === 0 ? 'white-row' : 'alternate-row';
}

}
