import { Component, OnInit } from '@angular/core';
import { BlogPostSideBarComponent } from '../blog-post-side-bar/blog-post-side-bar.component';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BlogHomeService } from '../../services/blogHome/blog-home.service';

@Component({
  selector: 'app-blog-post',
  standalone: true,
  imports: [BlogPostSideBarComponent, NgFor, RouterLink],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss',
})
export class BlogPostComponent implements OnInit {
  breadcrumbs = [
    { label: 'Home', url: '/' },
    { label: 'Blog Post', url: null },
  ];

  pageTitle = 'Blog Post';

  currentPage: number = 1; // الصفحة الحالية
  itemsPerPage: number = 3; // عدد المقالات لكل صفحة

  get paginatedBlogs() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    return this.blogs.slice(startIndex, startIndex + this.itemsPerPage);
  }

  get totalPages(): number[] {
    return Array.from(
      { length: Math.ceil(this.blogs.length / this.itemsPerPage) },
      (_, i) => i + 1
    );
  }

  changePage(page: number) {
    this.currentPage = page;
  }

  blogs: any[] = [];
  selectedBlog: any; // لتخزين التفاصيل الخاصة بالمدونة المختارة


  constructor(private blogService: BlogHomeService) {}

  ngOnInit() {
    this.getBlogs();
   
  }

  getBlogs() {
    this.blogService.getBlogs().subscribe({
      next: (data) => {
        this.blogs = data.map((blog) => {
          const formattedDate = blog.createdAtFormatted;
          const parts = formattedDate?.split(',')[1]?.trim().split(' ') ?? [];
          return {
            ...blog,
            month: parts[0] || '',
            date: parts[1] || '',
          };
        });
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      },
    });
  }



 
}
