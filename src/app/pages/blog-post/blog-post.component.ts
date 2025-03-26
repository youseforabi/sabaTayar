import { Component } from '@angular/core';
import { BlogPostSideBarComponent } from "../blog-post-side-bar/blog-post-side-bar.component";
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [BlogPostSideBarComponent,NgFor,RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog Post', url: null }
  ];
  
  pageTitle = 'Blog Post';

  currentPage: number = 1; // الصفحة الحالية
itemsPerPage: number = 3; // عدد المقالات لكل صفحة

get paginatedBlogs() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
}

get totalPages(): number[] {
  return Array.from({ length: Math.ceil(this.blogs.length / this.itemsPerPage) }, (_, i) => i + 1);
}

changePage(page: number) {
  this.currentPage = page;
}   

  blogs = [
    {
      title: 'Top 10 Must-Visit Travel Destinations...',
      date: '28',
      month: 'FEB',
      author: 'Sabatours',
      category: 'Adventure',
      image: 'assets/Mummification-thum.jpg',
      views: 260.2,
      comments: 12
    },
    {
      title: 'Camping Essentials: What You Need...',
      date: '15',
      month: 'JAN',
      author: 'Sabatours',
      category: 'Camping',
      image: 'assets/Mummification-thum.jpg',
      views: 150.8,
      comments: 8
    },
    {
      title: 'Tour Highlights: Discover The Best...',
      date: '07',
      month: 'MAR',
      author: 'Sabatours',
      category: 'History',
      image: 'assets/Mummification-thum.jpg',
      views: 320.5,
      comments: 18
    },

    {
      title: 'Tour Highlights: Discover The Best...',
      date: '07',
      month: 'MAR',
      author: 'Sabatours',
      category: 'History',
      image: 'assets/Mummification-thum.jpg',
      views: 320.5,
      comments: 18
    },
    {
      title: 'Tour Highlights: Discover The Best...',
      date: '07',
      month: 'MAR',
      author: 'Sabatours',
      category: 'History',
      image: 'assets/Mummification-thum.jpg',
      views: 320.5,
      comments: 18
    },
    {
      title: ': Discover The Best...',
      date: '07',
      month: 'MAR',
      author: 'Sabatours',
      category: 'History',
      image: 'assets/Mummification-thum.jpg',
      views: 320.5,
      comments: 18
    },
  ];

}
