import { NgFor } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone:true,
  imports: [NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {

  cardsPerView = 3;

  constructor() {
    this.updateCardsPerView();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateCardsPerView();
  }

  updateCardsPerView() {
    if (window.innerWidth <= 768) {
      this.cardsPerView = 1; // Single card on mobile view
    } else if (window.innerWidth <= 1024) {
      this.cardsPerView = 2; // Two cards on tablet view
    } else {
      this.cardsPerView = 3; // Three cards on larger screens
    }
  }

  testimonials = [
    { name: 'Daniel K.', country: 'Australia', title: 'Highly Recommended!', message: 'Great experience!' },
    { name: 'Emily R.', country: 'USA', title: 'Amazing Experience!', message: 'The best tour company.' },
    { name: 'James L.', country: 'UK', title: 'A Perfect Day!', message: 'Highly recommended!' },
    { name: 'Sophia M.', country: 'Canada', title: 'Loved it!', message: 'Fantastic guides and service.' },
    { name: 'Carlos D.', country: 'Spain', title: 'Worth it!', message: 'I would book again.' },
    { name: 'Liam P.', country: 'Germany', title: 'Top-notch!', message: 'Everything was well organized.' }
  ];
  
    visibleTestimonials: any[] = [];
    currentIndex = 0;
    testimonialsPerPage = 3;
    currentPage = 0;
    paginationArray: any[] = [];
  
  
    ngOnInit(): void {
      this.updateVisibleTestimonials();
      this.paginationArray = new Array(Math.ceil(this.testimonials.length / this.testimonialsPerPage));
    }
  
    updateVisibleTestimonials() {
      this.visibleTestimonials = this.testimonials.slice(this.currentIndex, this.currentIndex + this.testimonialsPerPage);
    }
  
    nextTestimonial() {
      if (this.currentIndex + this.testimonialsPerPage < this.testimonials.length) {
        this.currentIndex += this.testimonialsPerPage;
      } else {
        this.currentIndex = 0; // إعادة التكرار
      }
      this.currentPage = Math.floor(this.currentIndex / this.testimonialsPerPage);
      this.updateVisibleTestimonials();
    }
  
    prevTestimonial() {
      if (this.currentIndex - this.testimonialsPerPage >= 0) {
        this.currentIndex -= this.testimonialsPerPage;
      } else {
        this.currentIndex = this.testimonials.length - this.testimonialsPerPage; // العودة للنهاية
      }
      this.currentPage = Math.floor(this.currentIndex / this.testimonialsPerPage);
      this.updateVisibleTestimonials();
    }
  
    goToPage(index: number) {
      this.currentPage = index;
      this.currentIndex = index * this.testimonialsPerPage;
      this.updateVisibleTestimonials();
    }
  
}
