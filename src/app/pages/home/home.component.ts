import { Router, RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { TourssComponent } from './tourss/tourss.component';
import { FeaturedComponent } from './featured/featured.component';
import { WhySabaComponent } from './why-saba/why-saba.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogComponent } from './blog/blog.component';
import { HomeCaraComponent } from './home-cara/home-cara.component';
import { HistoryExploreComponent } from './history-explore/history-explore.component';
import { TourService } from '../../services/Tours/tour.service';
import { FormatCategoryPipe } from '../../pipes/format-category.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
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
    HistoryExploreComponent,
    FormatCategoryPipe
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent implements OnInit {
  searchCriteria = {
    place: '',
    tourType: '',
    people: '',
    dateControl: new FormControl(),
    priceMin: 1000,
    priceMax: 70000,
    selectedTags: [] as string[]
  };

  uniquePlaces: string[] = [];
  uniqueTourTypes: string[] = [];
  topTags: any[] = [];
  showFilters = false;


  
  constructor(private router: Router, private tourService: TourService) {}

  ngOnInit(): void {
    this.fetchUniquePlaces();
    this.fetchUniqueTourTypes();
    this.fetchTopTags();
  }

  fetchUniquePlaces(): void {
    this.tourService.getUniquePlaces().subscribe({
      next: (places) => {
        this.uniquePlaces = places;
      },
      error: (err) => {
        console.error('Error fetching unique places:', err);
      }
    });
  }

  fetchUniqueTourTypes(): void {
    this.tourService.getUniqueTourTypes().subscribe({
      next: (types) => {
        this.uniqueTourTypes = types;
      },
      error: (err) => {
        console.error('Error fetching unique tour types:', err);
      }
    });
  }

  fetchTopTags(): void {
    this.tourService.getTopTags().subscribe({
      next: (data) => {
        this.topTags = data.map((tag: any) => ({ ...tag, selected: false }));
      },
      error: (err) => {
        console.error('Error fetching top tags:', err);
      }
    });
  }

  toggleFilters(): void {
    this.showFilters = !this.showFilters;
  }

  onSearch(): void {
    const selectedDate = this.searchCriteria.dateControl.value
      ? this.formatDate(new Date(this.searchCriteria.dateControl.value))
      : '';

    this.router.navigate(['/listingTours'], {
      queryParams: {
        place: this.searchCriteria.place,
        tourType: this.searchCriteria.tourType,
        people: this.searchCriteria.people,
        date: selectedDate,
        priceMin: this.searchCriteria.priceMin,
        priceMax: this.searchCriteria.priceMax,
        selectedTags: JSON.stringify(this.searchCriteria.selectedTags)
      },
      queryParamsHandling: 'merge'
    });
  }

  onTagFilterChange(tag: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.searchCriteria.selectedTags.push(tag);
    } else {
      this.searchCriteria.selectedTags = this.searchCriteria.selectedTags.filter(t => t !== tag);
    }
  }

  updateTrack(): void {
    if (this.searchCriteria.priceMin > this.searchCriteria.priceMax) {
      [this.searchCriteria.priceMin, this.searchCriteria.priceMax] = [this.searchCriteria.priceMax, this.searchCriteria.priceMin];
    }

    const min = 1000;
    const max = 70000;
    const minPercent = ((this.searchCriteria.priceMin - min) / (max - min)) * 100;
    const maxPercent = ((this.searchCriteria.priceMax - min) / (max - min)) * 100;

    const track = document.querySelector('.slider-track') as HTMLElement;
    if (track) {
      track.style.left = `${minPercent}%`;
      track.style.width = `${maxPercent - minPercent}%`;
    }
  }

  formatDate(date: any): string {
    if (!date) return '';
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, '0')}-${d.getDate().toString().padStart(2, '0')}`;
  }

  navigateToReels(): void {
    this.router.navigate(['/reels']);
  }
}