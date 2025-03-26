import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-testimonials',
  standalone:true,
  imports: [NgFor],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  testimonials = [
    {
      rating: 5,
      comment: "I've used this travel booking site multiple times and have never been disappointed. The search filters are great for narrowing down options, and the prices are always competitive.",
      author: "Pete Jones",
      position: "Founder, Themesthat",
      gender: "male"
    },
    {
      rating: 4,
      comment: "Great platform! Booking is easy, and I always find good deals for my travels.",
      author: "Sarah Connor",
      position: "Traveler",
      gender: "female"
    },
    {
      rating: 5,
      comment: "Excellent service and user-friendly interface. I always use this site for my bookings.",
      author: "John Doe",
      position: "Freelancer",
      gender: "male"
    }
  ];

  activeIndex = 0;

  setActiveIndex(index: number) {
    if (index !== this.activeIndex) {
      this.activeIndex = index;
    }
  }
}
