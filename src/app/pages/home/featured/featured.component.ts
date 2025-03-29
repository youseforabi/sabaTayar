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
        type: 'Guide Tours',
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
        type: 'Classical Tours',
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
  
        type: 'Classical Tours',
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
  
        type: 'Classical Tours',
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
  
        type: 'Classical Tours',
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
  
        type: 'Classical Tours',
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
        case 'Guide Tours': return 'Guide';
        case 'Classical Tours': return 'Classical';
        case 'day': return 'Day Trip';
        default: return type;
      }
    }
    filterTours(category: string = 'Guide Tours') {
      this.activeCategory = category;
      this.showAll = false; // إعادة تعيين عرض الكل عند اختيار فئة
      
      if (category === 'all') {
        this.filteredTours = [...this.tours];
        this.showAll = true;
      } else {
        this.filteredTours = this.tours.filter(tour => {
          if (category === 'Guide Tours') return tour.type === 'Guide Tours';
          if (category === 'Classical Tours') return tour.type === 'Classical Tours';
          if (category === 'day') return tour.type === 'day';
          return true;
        });
      }
    }
    showAllTours() {
      this.filterTours('all');
    }
  

}
