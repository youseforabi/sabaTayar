import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-my-toors',
  standalone: true,
  imports: [
FontAwesomeModule
,
    NgFor
  ],
  templateUrl: './my-toors.component.html',
  styleUrl: './my-toors.component.scss'
})
export class MyToorsComponent {
  faMapMarkerAlt = faMapMarkerAlt;

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
