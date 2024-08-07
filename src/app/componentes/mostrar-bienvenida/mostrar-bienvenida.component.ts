import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';

@Component({
  selector: 'app-mostrar-bienvenida',
  standalone: true,
  imports: [MatGridListModule,
    
    
  ],
  templateUrl: './mostrar-bienvenida.component.html',
  styleUrl: './mostrar-bienvenida.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class MostrarBienvenidaComponent implements OnInit {
  images!: string[];

  ngOnInit() {
    this.images = [
      'assets/img/dlBar.jpeg',
      
      'assets/img/Screenshot 2024-06-14 133342.png'
    
    ];
  }
}
