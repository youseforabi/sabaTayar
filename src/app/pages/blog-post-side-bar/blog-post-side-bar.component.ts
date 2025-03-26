import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog-post-side-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './blog-post-side-bar.component.html',
  styleUrl: './blog-post-side-bar.component.scss'
})
export class BlogPostSideBarComponent {

  // ✅ مقالات مميزة (بيانات ثابتة الآن، جاهزة للربط مع API)
  popularPosts = [
    { id: 1, title: 'The Ultimate Guide To Planning Your Perfect Tour', image: 'assets/King-Sneferu-thum.jpg', category: 'Ancient' },
    { id: 2, title: 'Tips For A Comfortable And Enjoyable Trip', image: 'assets/King-Sneferu-thum.jpg', category: 'Ancient' },
    { id: 3, title: 'Explore The World Without Breaking', image: 'assets/King-Sneferu-thum.jpg', category: 'Adventure' },
    { id: 4, title: 'What’s Hot In The World Of Tours And Adventures', image: 'assets/King-Sneferu-thum.jpg', category: 'Adventure' },
    { id: 5, title: 'Benefits Of Spending Time In Nature', image: 'assets/King-Sneferu-thum.jpg', category: 'Ancient' },
  ];

  // ✅ التصنيفات (Categories)
  categories = ['Ancient', 'Tours', 'Travel', 'Activities', 'History'];

  // ✅ العلامات الشائعة (Tags)
  tags = ['Adventure Trips', 'Budget Travel', 'Camping', 'Cultural Tours', 'Guides', 'Luxury Travel', 'Tour Tips and Advice', 'Tour Packages'];

  youMayLikeList = [
    {
      id: 1,
      image: 'assets/King-Sneferu-thum.jpg',
      title: 'GUIDE OF EGYPT',
      locations: 'Cairo, Giza, Luxor, Aswan',
      description: 'Luxor, Valley Of Kings Vacation With Eternal Egypt',
      rating: 4.7,
      reviews: 230,
      duration: '10 Days / 9 Nights',
      price: '$325'
    },
    {
      id: 2,
      image: 'assets/King-Sneferu-thum.jpg', // Add more images
      title: 'COMPLETE EGYPT TOUR',
      locations: 'Cairo, Alexandria, Luxor',
      description: 'Pyramids and Nile Cruise Experience',
      rating: 4.8,
      reviews: 310,
      duration: '12 Days / 11 Nights',
      price: '$450'
    },
    {
      id: 3,
      image: 'assets/King-Sneferu-thum.jpg',
      title: 'EGYPT HIGHLIGHTS',
      locations: 'Giza, Luxor, Aswan',
      description: 'Best of Ancient Egypt Tour',
      rating: 4.5,
      reviews: 180,
      duration: '8 Days / 7 Nights',
      price: '$299'
    }
  ];

  // TrackBy function for better performance
  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
