import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured',
  standalone:true,
  imports: [NgFor],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent {
   
  featuredToursNow = [
    { id: 1, title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip", location: "75 PRINCE ST, NEW YORK, NY 10012, USA", price: "$50.00", image: "assets/3.jpg", rating: "0.0", comments: "0 comments" },
    { id: 2, title: "Lost Technologies of Ancient Egypt Tour III", location: "CAIRO, GIZA, LUXOR, ASWAN", rating: "0.0", comments: "0 comments", price: "$45.00", image: "assets/Untitled-1885.webp" }
  ];

}
