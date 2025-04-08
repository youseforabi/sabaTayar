import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-listing-tours',
  standalone: true,
  imports: [NgFor, NgIf,FormsModule],
  templateUrl: './listing-tours.component.html',
  styleUrls: ['./listing-tours.component.scss']
})
export class ListingToursComponent {
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

  allTours = [
    {
      id: 1,
      category: 'Cultural',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 1000,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false,
      amenities: { 
        transportation: true,
        tourGuide: true,
        mealsIncluded: true,
        hotelPickup: true,
        photography: false
      }
    },
    {
      id: 2,
      category: 'Cultural Tours',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Alexandria',
      rating: 4.5,
      title: 'Ancient Egypt Cultural Tour with Pyramids Visit',
      people: '4',
      duration: '5 Days/4 Nights',
      price: 700,
      place: 'Cairo',
      tourType: 'Cultural',
      date: '2025-05-15',
      liked: false,
      amenities: { 
        transportation: true,
        tourGuide: true,
        mealsIncluded: false,
        hotelPickup: true,
        photography: true
      }
    },
    {
      id: 3,
      category: 'Adventure Tours',
      image: 'assets/phnx.jpg',
      location: 'Mount Sinai, Red Sea',
      rating: 4.9,
      title: 'Sinai Desert Adventure with Red Sea Snorkeling',
      people: '3',
      duration: '7 Days/6 Nights',
      price: 1200,
      place: 'Sinai',
      tourType: 'Adventure',
      date: '2025-06-10',
      liked: false,
      amenities: { 
        transportation: true,
        tourGuide: false,
        mealsIncluded: true,
        hotelPickup: false,
        photography: false
      }
    },
    {
      id: 4,
      category: 'Relaxation Tours',
      image: 'assets/phnx.jpg',
      location: 'Sharm El Sheikh',
      rating: 5.0,
      title: 'Relaxing Beach Stay at Sharm El Sheikh Resort',
      people: '2',
      duration: '4 Days/3 Nights',
      price: 800,
      place: 'Sharm El Sheikh',
      tourType: 'Relaxation',
      date: '2025-07-01',
      liked: false,
      amenities: { 
        transportation: false,
        tourGuide: false,
        mealsIncluded: true,
        hotelPickup: true,
        photography: false
      }
    },
    {
      id: 5,
      category: 'Family Tours',
      image: 'assets/phnx.jpg',
      location: 'Hurghada, Makadi Bay',
      rating: 4.7,
      title: 'Family Fun at Hurghada Beach Resort',
      people: '5',
      duration: '6 Days/5 Nights',
      price: 1000,
      place: 'Hurghada',
      tourType: 'Family',
      date: '2025-08-01',
      liked: false,
      amenities: { 
        transportation: true,
        tourGuide: false,
        mealsIncluded: true,
        hotelPickup: true,
        photography: true
      }
    },
    {
      id: 6,
      category: 'Historical Tours',
      image: 'assets/phnx.jpg',
      location: 'Giza, Saqqara',
      rating: 4.6,
      title: 'Pyramids and Sphinx Exploration Tour',
      people: '2',
      duration: '1 Day',
      price: 150,
      place: 'Cairo',
      tourType: 'Cultural',
      date: '2025-04-15',
      liked: false,
      amenities: { 
        transportation: true,
        tourGuide: true,
        mealsIncluded: false,
        hotelPickup: true,
        photography: true
      }
    }
  ];

  get uniquePlaces(): string[] {
    return [...new Set(this.allTours.map(tour => tour.place))];
  }

  get uniqueTourTypes(): string[] {
    return [...new Set(this.allTours.map(tour => tour.tourType))];
  }

  constructor() {
    this.applyFilters();
  }

  applyFilters() {
    this.filteredTours = this.allTours.filter(tour => {
      // Check place filter
      if (this.searchCriteria.place && tour.place !== this.searchCriteria.place) {
        return false;
      }
      
      // Check tour type filter
      if (this.searchCriteria.tourType && tour.tourType !== this.searchCriteria.tourType) {
        return false;
      }
      
      // Check people filter
      if (this.searchCriteria.people && tour.people !== this.searchCriteria.people) {
        return false;
      }
      
      // Check date filter
      if (this.searchCriteria.date && tour.date !== this.searchCriteria.date) {
        return false;
      }
      
      // Check price range
      if (tour.price < this.searchCriteria.priceMin || tour.price > this.searchCriteria.priceMax) {
        return false;
      }
      
      // Check rating filter
      if (this.searchCriteria.minRating && tour.rating < +this.searchCriteria.minRating) {
        return false;
      }
      
      // Check amenities
      const selectedAmenities = Object.entries(this.searchCriteria.amenities)
        .filter(([key, value]) => value)
        .map(([key]) => key);
      
      if (selectedAmenities.length > 0) {
        for (const amenity of selectedAmenities) {
          if (!tour.amenities[amenity]) {
            return false;
          }
        }
      }
      
      return true;
    });
    
    this.currentPage = 1;
  }

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