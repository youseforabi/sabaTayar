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
      // For debugging
      console.log('Filtering tour:', tour.tourTitle);
      
      // Filter by place
      if (this.searchCriteria.place && this.searchCriteria.place !== '') {
        // Check if tour.places exists and contains the selected place
        if (!tour.places || !tour.places.some(place => place === this.searchCriteria.place)) {
          console.log(`Filtered out by place: ${this.searchCriteria.place}`);
          return false;
        }
      }
  
      // Filter by tour type
      if (this.searchCriteria.tourType && this.searchCriteria.tourType !== '') {
        if (tour.tourCategory !== this.searchCriteria.tourType) {
          console.log(`Filtered out by tour type: ${this.searchCriteria.tourType}`);
          return false;
        }
      }
  
      // Filter by date
      if (this.searchCriteria.date && this.searchCriteria.date !== '') {
        // Make sure tour.tourDate exists and is a valid date
        if (!tour.tourDate && !tour.availableDates?.length) {
          console.log('Filtered out by missing date');
          return false;
        }
        
        const tourDate = tour.tourDate ? new Date(tour.tourDate) : 
                        (tour.availableDates?.length ? new Date(tour.availableDates[0].date) : null);
        const selectedDate = new Date(this.searchCriteria.date);
        
        if (!tourDate || isNaN(tourDate.getTime()) || tourDate < selectedDate) {
          console.log(`Filtered out by date: ${this.searchCriteria.date}`);
          return false;
        }
      }
  
      // Filter by people count
      if (this.searchCriteria.people && this.searchCriteria.people !== '') {
        const peopleCount = parseInt(this.searchCriteria.people);
        
        // Handle '6+' case specially
        const maxPeople = this.searchCriteria.people === '6+' ? 6 : peopleCount;
        
        // Check either capacity or guestsCapabilityAdult
        const tourCapacity = tour.capacity || tour.guestsCapabilityAdult || 0;
        
        if (tourCapacity < maxPeople) {
          console.log(`Filtered out by people: ${this.searchCriteria.people}`);
          return false;
        }
      }
  
      // Filter by price range
      // Use tourPrice field based on the sample data
      if ((tour.tourPrice < this.searchCriteria.priceMin) || 
          (tour.tourPrice > this.searchCriteria.priceMax)) {
        console.log(`Filtered out by price range: ${this.searchCriteria.priceMin}-${this.searchCriteria.priceMax}`);
        return false;
      }
  
      // Filter by tags - corrected to use tourTags
      if (this.searchCriteria.selectedTags.length > 0) {
        // Use tourTags instead of tags based on the sample data
        if (!tour.tourTags || !Array.isArray(tour.tourTags) || 
            !this.searchCriteria.selectedTags.some(tag => tour.tourTags.includes(tag))) {
          console.log(`Filtered out by tags: ${this.searchCriteria.selectedTags.join(', ')}`);
          return false;
        }
      }
  
      // Filter by selected users' comments
      if (this.searchCriteria.selectedUsers.length > 0) {
        // Check if tour has comments and at least one comment from a selected user
        // Based on the sample data structure, access the userName property correctly
        if (!tour.comments.content   || !Array.isArray(tour.comments.content) || 
        this.searchCriteria.selectedUsers.some(comment => tour.comments.content.includes(comment))) {
          console.log(`Filtered out by comments: ${this.searchCriteria.selectedUsers.join(', ')}`);
          return false;
        }
      }
  
      // Tour passed all filters
      return true;
    });
  
    // Reset to first page when filters change
    this.currentPage = 1;
    console.log(`Filtered tours: ${this.filteredTours.length} of ${this.allTours.length}`);
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