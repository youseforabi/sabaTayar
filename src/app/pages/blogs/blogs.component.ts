import { Component } from '@angular/core';
import { Blogs } from '../../Intrerfaces/Blogs';
import { NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommentsBlogs } from '../../Intrerfaces/CommentsBlogs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-blogs',
  imports: [NgFor,FormsModule,RouterModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent {
  searchTerm: string = '';
  selectedCategory: string = 'all';  // فلترة حسب التصنيف

  blogs: Blogs[] = [
    {
      id: 1,
      title: 'The Future of AI in Web Development',
      description: 'Discover how artificial intelligence is transforming web development...',
      imageUrl: 'assets/King-Sneferu-thum.jpg',
      views: 1250,
      category: 'Technology'
    },
    {
      id: 1,
      title: 'The Future of AI in Web Development',
      description: 'Discover how artificial intelligence is transforming web development...',
      imageUrl: 'assets/King-Sneferu-thum.jpg',
      views: 1250,
      category: 'Technology'
    },
    {
      id: 1,
      title: 'The Future of AI in Web Development',
      description: 'Discover how artificial intelligence is transforming web development...',
      imageUrl: 'assets/King-Sneferu-thum.jpg',
      views: 1250,
      category: 'Technology'
    },
    {
      id: 2,
      title: 'Top 10 JavaScript Frameworks in 2025',
      description: 'A detailed comparison of the most popular JavaScript frameworks...',
      imageUrl: 'assets/King-Sneferu-thum.jpg',
      views: 950,
      category: 'Development'
    },
    {
      id: 3,
      title: 'How to Improve Website Performance',
      description: 'Learn techniques to enhance speed and efficiency of your website...',
      imageUrl: 'assets/King-Sneferu-thum.jpg',
      views: 790,
      category: 'Optimization'
    }
  ];

  comments: CommentsBlogs[]= [
    {
      id: 1,
      userImage: 'assets/user1jpg.jpg',
      userName: 'Saba Tours',
      commentText: 'Saba Tours is the best travel agency!',
      timestamp: 'March 5, 2025 9:07 am'
    },
    {
      id: 2,
      userImage: 'assets/user1jpg.jpg',
      userName: 'John Doe',
      commentText: "I have booked your <b>Ramses II Temple 'Ramesseum'</b>, <b>Luxor Day Trip</b>! It's amazing!",
      timestamp: 'March 5, 2025 9:07 am'
    }
  ];

  constructor() {}

  getBlogs(): Observable<Blogs[]> {
    return of(this.blogs);
  }

  get filteredBlogs() {
    return this.blogs.filter(blog => {
      const matchesSearch = 
      // blog.title.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            blog.category.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesCategory = this.selectedCategory === 'all' || blog.category === this.selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }

  filterBlogs(category: string) {
    this.selectedCategory = category;
  }

  deleteComment(id: number) {
    this.comments = this.comments.filter(comment => comment.id !== id);
  }
}
