import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { TourService } from '../../services/Tours/tour.service';
export interface Tag {
  tagName: string;
  toursCount: number;
}

export interface Tour {
  id: number;
  title: string;
  mainImageUrl: string;
  location: string;
  peopleCount: number;
  tourDay: number;
  tourNight: number;
  price: number;
  rating: number;
  category: string;
}

@Component({
  selector: 'app-classic-tour',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './classic-tour.component.html',
  styleUrls: ['./classic-tour.component.scss']
})
export class ClassicTourComponent implements OnInit {
  tours: Tour[] = [];
  filteredTours: Tour[] = [];
  sortOption: string = 'default';
  toursPerRow: number = 4;

  date: string = '';
  peopleCount: number | null = null;
  priceRange: number = 5000;
  tags: string[] = [];
  availableTags: Tag[] = [];

  constructor(private tourService: TourService, private router: Router) {}

  ngOnInit(): void {
    this.loadTours();
    this.loadTopTags();
  }

  loadTours(): void {
    this.tourService.getAllToursClassic().subscribe({
      next: (tours: Tour[]) => {
        this.tours = tours;
        this.applyFilters();
      },
      error: (err) => {
        console.error('Error fetching Classic tours:', err);
      }
    });
  }

  loadTopTags(): void {
    this.tourService.getTopTags().subscribe({
      next: (tags: Tag[]) => {
        this.availableTags = this.getRandomTags(tags, 5);
      },
      error: (err) => {
        console.error('Error fetching top tags:', err);
        this.availableTags = [
          { tagName: 'luxury', toursCount: 4 },
          { tagName: 'budget', toursCount: 3 },
          { tagName: 'family', toursCount: 2 },
          { tagName: 'solo', toursCount: 1 },
          { tagName: 'adventure', toursCount: 1 }
        ];
      }
    });
  }

  getRandomTags(tags: Tag[], count: number): Tag[] {
    const shuffled = tags.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, tags.length));
  }

  viewTourDetails(tourId: number): void {
    this.router.navigate(['/tours', tourId]);
  }

  applyFilters(): void {
    this.filteredTours = this.tours.filter(tour => {
      const priceMatch = tour.price <= this.priceRange;
      const peopleMatch = this.peopleCount === null || tour.peopleCount >= this.peopleCount;
      const dateMatch = this.date === '' || true;
      const tagsMatch = this.tags.length === 0;

      return priceMatch && peopleMatch && dateMatch && tagsMatch;
    });

    this.sortTours();
  }

  sortTours(): void {
    if (this.sortOption === 'price-asc') {
      this.filteredTours.sort((a, b) => a.price - b.price);
    } else if (this.sortOption === 'price-desc') {
      this.filteredTours.sort((a, b) => b.price - a.price);
    } else if (this.sortOption === 'rating-desc') {
      this.filteredTours.sort((a, b) => b.rating - a.rating);
    }
  }

  onSortChange(): void {
    this.sortTours();
  }

  onToursPerRowChange(): void {
    this.toursPerRow = Number(this.toursPerRow);
  }

  toggleTag(tagName: string): void {
    const index = this.tags.indexOf(tagName);
    if (index === -1) {
      this.tags.push(tagName);
    } else {
      this.tags.splice(index, 1);
    }
    this.applyFilters();
  }

  resetFilters(): void {
    this.date = '';
    this.peopleCount = null;
    this.priceRange = 5000;
    this.tags = [];
    this.applyFilters();
  }
}