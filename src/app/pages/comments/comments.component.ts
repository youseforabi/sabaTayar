import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [CarouselModule,NgFor],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.scss',
})
export class CommentsComponent {
  customOptions: OwlOptions = {
    loop: true,
    margin: 20,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    nav: false,
    responsive: {
      0: { items: 1 }, // عرض 1 فقط في الشاشات الصغيرة
      600: { items: 2 }, // عرض 2 في الأجهزة المتوسطة
      1000: { items: 3 } // عرض 3 كاردات في الشاشات الكبيرة
    }
  };
  

  comments = [
    { img: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'John Doe', text: 'Amazing experience!', date: '2024-03-09 21:30' },
    { img: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Sarah Smith', text: 'Excellent service!', date: '2024-03-08 18:15' },
    { img: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Michael Brown', text: 'Very professional!', date: '2024-03-07 14:00' },
    { img: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'Emily Davis', text: 'Fast response!', date: '2024-03-06 10:45' },
    { img: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'Chris Wilson', text: 'Super happy with the experience!', date: '2024-03-05 09:30' },
    { img: 'https://randomuser.me/api/portraits/women/6.jpg', name: 'Olivia Taylor', text: 'Absolutely fantastic!', date: '2024-03-04 18:20' }
  ];
}
