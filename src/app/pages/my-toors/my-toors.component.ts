import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AddNewTourComponent } from '../add-new-tour/add-new-tour.component';

import { RouterModule } from '@angular/router';
@Component({
    selector: 'app-my-toors',
    standalone:true,

    imports: [
      RouterModule,
        NgFor
    ],
    templateUrl: './my-toors.component.html',
    styleUrl: './my-toors.component.scss'
})
export class MyToorsComponent implements OnInit {

  filters: string[] = ['Guide Of Egypt', 'Classical Tours', 'Day Of Trips' ,'Deleted Tours'];


  tours = [
    {
      title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip",
      location: "75 PRINCE ST, NEW YORK, NY 10012, USA",
      image: "assets/toors1jpg.jpg",
      type:'Guide Of Egypt'
    },

    {
      title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip",
      location: "75 PRINCE ST, NEW YORK, NY 10012, USA",
      image: "assets/toors1jpg.jpg",
      type:'Guide Of Egypt'
    },
    {
      title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip",
      location: "75 PRINCE ST, NEW YORK, NY 10012, USA",
      image: "assets/toors1jpg.jpg",
      type:'Guide Of Egypt'
    },
    {
      title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip",
      location: "75 PRINCE ST, NEW YORK, NY 10012, USA",
      image: "assets/toors1jpg.jpg",
      type:'Guide Of Egypt'
    },

    {
      title: "Best deal For the Cars",
      location: "1327 Intervale Ave, Bronx, NY 10459, USA",
      image: "assets/toors2.jpg",
      type:'Classical Tours'

    },
    {
      title: "Best deal For the Cars",
      location: "1327 Intervale Ave, Bronx, NY 10459, USA",
      image: "assets/toors2.jpg",
      type:'Classical Tours'

    },
    {
      title: "Best deal For the Cars",
      location: "1327 Intervale Ave, Bronx, NY 10459, USA",
      image: "assets/toors2.jpg",
      type:'Classical Tours'

    },

    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Day Of Trips'

    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Day Of Trips'

    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Day Of Trips'

    },

    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Day Of Trips'

    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Deleted Tours'

    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Deleted Tours'

    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Deleted Tours'

    },
    {
      title: "Luxary Restaurant",
      location: "W 85TH ST, NEW YORK, NY 10024, USA",
      image: "assets/toors3.jpg",
      type:'Deleted Tours'

    },

  ];
  ngOnInit(): void {
    this.filter('Guide Of Egypt'); 

  }

  filteredTours = this.tours;
  filter(type: string) {
    this.filteredTours = this.tours.filter(tour => tour.type === type);
  }

  


}
