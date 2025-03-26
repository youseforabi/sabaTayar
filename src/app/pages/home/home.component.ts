import { Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component, ElementRef, HostListener, OnInit, ViewChild, inject } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core'; // إضافة هذا السطر
import { CommonModule, NgFor } from '@angular/common';
import { TourssComponent } from './tourss/tourss.component';
import { FeaturedComponent } from './featured/featured.component';
import { WhySabaComponent } from './why-saba/why-saba.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogComponent } from './blog/blog.component';
import { HomeCaraComponent } from "./home-cara/home-cara.component";
import { HomeService } from '../../services/Home/home.service';
import { HistoryExploreComponent } from "./history-explore/history-explore.component";

@Component({
    selector: 'app-home',
    standalone:true,

    imports: [
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    BlogComponent,
    TourssComponent,
    FeaturedComponent,
  
    TestimonialsComponent,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    HomeCaraComponent,
    HistoryExploreComponent
],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeComponent {

  searchCriteria = {
    place:   '',
  tourType:  '',
  people:  '',
  dateControl : new FormControl(),
  };
  openDatepicker(datepicker: any) {
    datepicker.open();
  }
  
  reviews = [
    { author: "DANIEL K., AUSTRALIA", text: "I was looking for a reliable tour company, and SabaTours delivered." },
    { author: "EMILY R., USA", text: "SabaTours made our trip to Egypt unforgettable!" },
    { author: "JAMES L., UK", text: "Our guide was friendly and insightful. We learned so much." },
    { author: "DANIEL K., AUSTRALIA", text: "I was looking for a reliable tour company, and SabaTours delivered." },
    { author: "EMILY R., USA", text: "SabaTours made our trip to Egypt unforgettable!" },
    { author: "JAMES L., UK", text: "Our guide was friendly and insightful. We learned so much." }
  ];

  constructor(private router: Router) {}

  onSearch() {
    const selectedDate = this.searchCriteria.dateControl.value
      ? this.formatDate(new Date(this.searchCriteria.dateControl.value))
      : '';
  
    this.router.navigate(['/listingTours'], {
      queryParams: {
        place: this.searchCriteria.place,
        tourType: this.searchCriteria.tourType,
        people: this.searchCriteria.people,
        date: selectedDate 
      }
    });

  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

}
