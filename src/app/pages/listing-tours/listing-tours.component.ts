import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-listing-tours',
  standalone: true, // إذا كنت تستخدم Standalone Components
  imports: [ NgFor,NgIf],
  templateUrl: './listing-tours.component.html',
  styleUrls: ['./listing-tours.component.scss']
})
export class ListingToursComponent implements OnInit {
  searchCriteria: any = {};
  filteredTours: any[] = [];

  currentPage: number = 1;
  itemsPerPage: number = 2; // عدد العناصر لكل صفحة
  
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
  allTours = [
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
    {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
     {
      id: 1,
      category: 'CLASSICAL TOURS',
      image: 'assets/phnx.jpg',
      location: 'Cairo, Luxor, Aswan',
      rating: 4.8,
      title: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      people: '2',
      duration: '8 Days/7 Nights',
      price: 500,
      place: 'Cairo',
      tourType: 'Adventure',
      date: '2025-04-01',
      liked: false // للتحكم في زر الإعجاب
    },
  ];
  getFullStars(rating: number): number[] {
    return Array(Math.floor(rating)).fill(0);
  }
  
  hasHalfStar(rating: number): boolean {
    return rating % 1 !== 0;
  }

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.searchCriteria = params;
      this.filterTours();
    });
  }

  filterTours() {
    this.filteredTours = this.allTours.filter(tour =>
      (!this.searchCriteria.place || tour.place.toLowerCase() === this.searchCriteria.place.toLowerCase()) &&
      (!this.searchCriteria.tourType || tour.tourType.toLowerCase() === this.searchCriteria.tourType.toLowerCase()) &&
      (!this.searchCriteria.people || +tour.people === +this.searchCriteria.people) &&
      (!this.searchCriteria.date || tour.date === this.searchCriteria.date)
    );
  }
  toggleLike(tour: any) {
    tour.liked = !tour.liked;
  }
}
