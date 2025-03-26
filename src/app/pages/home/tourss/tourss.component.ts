import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-tourss',
  standalone:true,
  imports: [NgFor],
  templateUrl: './tourss.component.html',
  styleUrl: './tourss.component.scss'
})
export class TourssComponent {
  destinations = [
    { 
      name: 'Cairo', 
      tours: 39,
      image: 'assets/vall.jpg'
    },
    { 
      name: 'Giza', 
      tours: 32,
      image: 'assets/phnx.jpg'
    },
    { 
      name: 'Luxor', 
      tours: 42,
      image: 'assets/toors3.jpg'
    },
    { 
      name: 'Luxor', 
      tours: 42,
      image: 'assets/toors3.jpg'
    },
    { 
      name: 'Luxor', 
      tours: 42,
      image: 'assets/toors3.jpg'
    },
    { 
      name: 'Luxor', 
      tours: 42,
      image: 'assets/toors3.jpg'
    },
  ];

}
