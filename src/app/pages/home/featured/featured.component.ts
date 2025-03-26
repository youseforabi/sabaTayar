import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-featured',
  standalone:true,
  imports: [NgFor,NgClass],
  templateUrl: './featured.component.html',
  styleUrl: './featured.component.scss'
})
export class FeaturedComponent {
   
  showAll: boolean = false; // متغير لتتبع حالة عرض الكل
  
  
    activeCategory: string = 'guide'; // القسم النشط افتراضياً
    filteredTours: any[] = [];
    tours = [
      {
        id: 1,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Power Of The Symbols Of Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: 'A2 08 People',
        price: '$243',
        type: 'guide',
        rating: 4.8,
  
        image: 'assets/King-Sneferu-thum.jpg' // مسار الصورة
      },
      {
        id: 2,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: '23 People',
        price: '$213',
        type: 'classical',
        rating: 4.8,
  
        image: 'assets/King-Sneferu-thum.jpg'
      },
      {
        id: 3,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Power Of The Symbols Of Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: '12 People',
        price: '$325',
        rating: 4.8,
  
        type: 'classical',
        image: 'assets/King-Sneferu-thum.jpg'
      },
      {
        id: 3,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Power Of The Symbols Of Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: '12 People',
        price: '$325',
        rating: 4.8,
  
        type: 'classical',
        image: 'assets/King-Sneferu-thum.jpg'
      },
  
      {
        id: 3,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Power Of The Symbols Of Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: '12 People',
        price: '$325',
        rating: 4.8,
  
        type: 'classical',
        image: 'assets/King-Sneferu-thum.jpg'
      },
      {
        id: 3,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Power Of The Symbols Of Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: '12 People',
        price: '$325',
        rating: 4.8,
  
        type: 'classical',
        image: 'assets/King-Sneferu-thum.jpg'
      },
      {
        id: 4,
        location: 'Cairo Luxor, Aswan',
        subtitle: 'Ancient Egypt',
        duration: '09 Days/08 Night',
        groupSize: '22 People',
        price: '$92',
        type: 'day',
        rating: 4.8,
  
        image: 'assets/King-Sneferu-thum.jpg'
      }
    ];
  
  
    constructor() {
      this.filterTours('all');
    }
  
    getTypeName(type: string): string {
      switch(type) {
        case 'guide': return 'Guide';
        case 'classical': return 'Classical';
        case 'day': return 'Day Trip';
        default: return type;
      }
    }
    filterTours(category: string = 'guide') {
      this.activeCategory = category;
      this.showAll = false; // إعادة تعيين عرض الكل عند اختيار فئة
      
      if (category === 'all') {
        this.filteredTours = [...this.tours];
        this.showAll = true;
      } else {
        this.filteredTours = this.tours.filter(tour => {
          if (category === 'guide') return tour.type === 'guide';
          if (category === 'classical') return tour.type === 'classical';
          if (category === 'day') return tour.type === 'day';
          return true;
        });
      }
    }
    showAllTours() {
      this.filterTours('all');
    }
  

}
