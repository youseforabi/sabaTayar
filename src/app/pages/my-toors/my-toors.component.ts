import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
@Component({
    selector: 'app-my-toors',
    standalone:true,

    imports: [
        
        NgFor
    ],
    templateUrl: './my-toors.component.html',
    styleUrl: './my-toors.component.scss'
})
export class MyToorsComponent {

  tours = [
    {
      title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip",
      location: "75 PRINCE ST, NEW YORK, NY 10012, USA",
      image: "assets/toors1jpg.jpg"
    },
    {
      title: "Best deal For the Cars",
      location: "1327 Intervale Ave, Bronx, NY 10459, USA",
      image: "assets/toors2.jpg"
    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg"
    }
  ];

}
