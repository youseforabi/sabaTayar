import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BlogHomeService } from '../../services/blogHome/blog-home.service';

@Component({
  selector: 'app-blog-post-side-bar',
  standalone: true,
  imports: [NgFor],
  templateUrl: './blog-post-side-bar.component.html',
  styleUrl: './blog-post-side-bar.component.scss'
})
export class BlogPostSideBarComponent implements OnInit {
  

  // ✅ مقالات مميزة (بيانات ثابتة الآن، جاهزة للربط مع API)
  blogs: any[] = [];


  // ✅ التصنيفات (Categories)
  categories: any[] = [];
  tags: any[] = [];
  youMayLikeList = [];
  constructor(private blogService: BlogHomeService) {}

  ngOnInit(): void {
    this.getBlogs();
    this.getCategories();
    this.getTags();
    this.getTourCards()
    }

    getBlogs() {
      this.blogService.getBlogs().subscribe({
        next: (data) => {
          const latestSix = data.slice(0, 6); // أول 6 مقالات من الأحدث للأقدم
    
          this.blogs = latestSix;
        },
        error: (err) => {
          console.error('Error fetching blogs:', err);
        }
      });
    }
    
    getCategories() {
      this.blogService.getBlogsCategoryHome().subscribe({
        next: (data) => {
          this.categories = data;
        },
        error: (err) => {
          console.error('Error fetching categories:', err);
        },
      });
    }
  
    getTags() {
      this.blogService.getBlogsTagsHome().subscribe({
        next: (data) => {
          this.tags = data;
        },
        error: (err) => {
          console.error('Error fetching tags:', err);
        },
      });
    }

    getTourCards() {
      this.blogService.getBlogsTourCardsHome().subscribe({
        next: (data) => {
          this.youMayLikeList = data.map((tour) => ({
            ...tour,
            reviews: tour.reviews || 0,
            description: tour.description || '',
            duration: `${tour.tourDay}Day/${tour.tourNight}Night` // أو أي تنسيق يعجبك
          }));
        },
        error: (err) => {
          console.error('Error fetching tour cards:', err);
        }
      });
    }
    


  // TrackBy function for better performance
  trackByFn(index: number, item: any): number {
    return item.id;
  }
}
