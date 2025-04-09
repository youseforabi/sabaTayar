import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourService } from '../../services/Tours/tour.service';

@Component({
  selector: 'app-listing-tours',
  standalone: true,
  imports: [NgFor, NgIf,FormsModule],
  templateUrl: './listing-tours.component.html',
  styleUrls: ['./listing-tours.component.scss']
})
export class ListingToursComponent implements OnInit {

  searchCriteria = {
    place: '',
    tourType: '',
    people: '',
    date: '',
    priceMin: 500,
    priceMax: 1000,
    minRating: '',
    amenities: {
      transportation: false,
      tourGuide: false,
      mealsIncluded: false,
      hotelPickup: false,
      photography: false
    }
  };

  peopleOptions = ['1', '2', '3', '4', '5', '6+'];
  filteredTours: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;

  allTours = [];

  get uniquePlaces(): string[] {
    return [...new Set(this.allTours.map(tour => tour.place))];
  }

  get uniqueTourTypes(): string[] {
    return [...new Set(this.allTours.map(tour => tour.tourType))];
  }

  constructor(private tourService: TourService) {
    // this.applyFilters();
  }

  ngOnInit(): void {
    this.getAllToursWithComments(); // استدعاء الفانكشن هنا
  }
  
  // الفانكشن برا ngOnInit
  getAllToursWithComments(): void {
    this.tourService.getAllToursWithComments().subscribe({
      next: (data) => {
        this.allTours = data;
        console.log(this.allTours);
        
      },
      error: (err) => {
        console.error('Error fetching tours with comments:', err);
      }
    });
  }

  // applyFilters() {
  //   this.filteredTours = this.allTours.filter(tour => {
  //     // Check place filter
  //     if (this.searchCriteria.place && tour.place !== this.searchCriteria.place) {
  //       return false;
  //     }
      
  //     // Check tour type filter
  //     if (this.searchCriteria.tourType && tour.tourType !== this.searchCriteria.tourType) {
  //       return false;
  //     }
      
  //     // Check people filter
  //     if (this.searchCriteria.people && tour.people !== this.searchCriteria.people) {
  //       return false;
  //     }
      
  //     // Check date filter
  //     if (this.searchCriteria.date && tour.date !== this.searchCriteria.date) {
  //       return false;
  //     }
      
  //     // Check price range
  //     if (tour.price < this.searchCriteria.priceMin || tour.price > this.searchCriteria.priceMax) {
  //       return false;
  //     }
      
  //     // Check rating filter
  //     if (this.searchCriteria.minRating && tour.rating < +this.searchCriteria.minRating) {
  //       return false;
  //     }
      
  //     // Check amenities
  //     const selectedAmenities = Object.entries(this.searchCriteria.amenities)
  //       .filter(([key, value]) => value)
  //       .map(([key]) => key);
      
  //     if (selectedAmenities.length > 0) {
  //       for (const amenity of selectedAmenities) {
  //         if (!tour.amenities[amenity]) {
  //           return false;
  //         }
  //       }
  //     }
      
  //     return true;
  //   });
    
  //   this.currentPage = 1;
  // }

  

  get paginatedTours() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.filteredTours.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.filteredTours.length / this.itemsPerPage) }, (_, i) => i + 1);
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  toggleLike(tour: any) {
    tour.liked = !tour.liked;
  }

  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }

  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }
}