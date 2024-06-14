import { Component, OnInit } from '@angular/core';
import {MatGridListModule} from '@angular/material/grid-list';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-mostrar-bienvenida',
  standalone: true,
  imports: [MatGridListModule,
    CarouselModule,
    
  ],
  templateUrl: './mostrar-bienvenida.component.html',
  styleUrl: './mostrar-bienvenida.component.css'
})
export class MostrarBienvenidaComponent implements OnInit {
  images!: string[];

  ngOnInit() {
    this.images = [
      'assets/img/Screenshot 2024-06-14 131938.png',
      
      'assets/img/Screenshot 2024-06-14 133342.png'
    
    ];
  }
}
