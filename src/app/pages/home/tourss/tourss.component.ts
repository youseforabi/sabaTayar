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


  tours = [
    { title: 'Guide Of Egypt Tours', image: 'assets/PIC1.webp' },
    { title: 'Classic Tours', image: 'assets/pic2.webp' },
    { title: 'Day Trips', image: 'assets/pic3.webp' }
  ];

}
