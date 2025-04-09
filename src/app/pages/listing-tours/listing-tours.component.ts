import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TourService } from '../../services/Tours/tour.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing-tours',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
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
    selectedTags: [] as string[],
    selectedUsers: [] as string[]
  };

  peopleOptions = ['1', '2', '3', '4', '5', '6+'];
  allTours: any[] = [];
  filteredTours: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 6;
  topTags: any[] = [];
  recentComments: any[] = [];

  get uniquePlaces(): string[] {
    return [...new Set(this.allTours.map(tour => tour.places?.[0] || ''))].filter(place => place);
  }

  get uniqueTourTypes(): string[] {
    return [...new Set(this.allTours.map(tour => tour.tourCategory))].filter(type => type);
  }

  constructor(private tourService: TourService,
    private router: Router  // Add router to constructor

  ) {}

  ngOnInit(): void {
    this.getAllToursWithComments();
    this.getTopTags();
    this.getRecentComment();
  }
  viewTourDetails(tourId: string): void {
    this.router.navigate(['/tours', tourId]);
  }
  
  getAllToursWithComments(): void {
    this.tourService.getAllToursWithComments().subscribe({
      next: (data) => {
        this.allTours = data;
        this.filteredTours = [...this.allTours];  // Initialize filtered tours with all the data
        console.log(this.allTours);
      },
      error: (err) => {
        console.error('Error fetching tours with comments:', err);
      }
    });
  }

  getTopTags(): void {
    this.tourService.getTopTags().subscribe({
      next: (data) => {
        this.topTags = data;
      },
      error: (err) => {
        console.error('Error fetching top tags:', err);
      }
    });
  }

  getRecentComment(): void {
    this.tourService.getRecentComment().subscribe({
      next: (data) => {
        const uniqueUsers = Array.from(new Set(data.map(c => c.userName)));
        this.recentComments = uniqueUsers;
      },
      error: (err) => {
        console.error('Error fetching recent comments:', err);
      }
    });
  }

  applyFilters(): void {
    this.filteredTours = this.allTours.filter(tour => {
      // Filter by place
      if (this.searchCriteria.place && (!tour.places || !tour.places.includes(this.searchCriteria.place))) {
        return false;
      }

      // Filter by tour type
      if (this.searchCriteria.tourType && tour.tourCategory !== this.searchCriteria.tourType) {
        return false;
      }

      // Filter by date
      if (this.searchCriteria.date) {
        // Assuming tour has a date field that can be compared
        const tourDate = new Date(tour.tourDate);
        const selectedDate = new Date(this.searchCriteria.date);
        if (isNaN(tourDate.getTime()) || tourDate < selectedDate) {
          return false;
        }
      }

      // Filter by people count
      if (this.searchCriteria.people) {
        // Assuming tour has a capacity or similar field
        if (tour.capacity < parseInt(this.searchCriteria.people)) {
          return false;
        }
      }

      // Filter by price range
      if (tour.tourPrice < this.searchCriteria.priceMin || tour.tourPrice > this.searchCriteria.priceMax) {
        return false;
      }

      // Filter by tags
      if (this.searchCriteria.selectedTags.length > 0) {
        if (!tour.tags || !this.searchCriteria.selectedTags.some(tag => tour.tags.includes(tag))) {
          return false;
        }
      }

      // Filter by selected users' comments
      if (this.searchCriteria.selectedUsers.length > 0) {
        if (!tour.comments || !tour.comments.some(comment => 
          this.searchCriteria.selectedUsers.includes(comment.userName))) {
          return false;
        }
      }

      return true;
    });

    // Reset to first page when filters change
    this.currentPage = 1;
  }

  onTagFilterChange(tag: string, event: Event): void {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.searchCriteria.selectedTags.push(tag);
    } else {
      this.searchCriteria.selectedTags = this.searchCriteria.selectedTags.filter(t => t !== tag);
    }
    this.applyFilters();
  }

  onUserToggle(userName: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const checked = input.checked;

    if (checked) {
      this.searchCriteria.selectedUsers.push(userName);
    } else {
      this.searchCriteria.selectedUsers = this.searchCriteria.selectedUsers.filter(user => user !== userName);
    }
    this.applyFilters();
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

  // Price range handlers
  updatePriceMin(event: Event): void {
    this.searchCriteria.priceMin = parseInt((event.target as HTMLInputElement).value);
    this.applyFilters();
  }

  updatePriceMax(event: Event): void {
    this.searchCriteria.priceMax = parseInt((event.target as HTMLInputElement).value);
    this.applyFilters();
  }
  
  // Handle place change
  onPlaceChange(event: Event): void {
    this.searchCriteria.place = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }
  
  // Handle tour type change
  onTourTypeChange(event: Event): void {
    this.searchCriteria.tourType = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }
  
  // Handle date change
  onDateChange(event: Event): void {
    this.searchCriteria.date = (event.target as HTMLInputElement).value;
    this.applyFilters();
  }
  
  // Handle people change
  onPeopleChange(event: Event): void {
    this.searchCriteria.people = (event.target as HTMLSelectElement).value;
    this.applyFilters();
  }
}