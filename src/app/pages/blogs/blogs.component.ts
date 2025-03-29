import { Component, OnInit } from '@angular/core';
import { Blogs } from '../../Intrerfaces/Blogs';
import { NgFor } from '@angular/common';
import { Observable, of } from 'rxjs';
import { FormsModule, NgModel, ReactiveFormsModule } from '@angular/forms';
import { CommentsBlogs } from '../../Intrerfaces/CommentsBlogs';
import { RouterModule } from '@angular/router';
import { BlogService } from '../../services/dashBlog/blog.service';
import { CommentsService } from '../../services/comment/comments.service';

@Component({
  selector: 'app-blogs',
  imports: [NgFor,FormsModule,RouterModule],
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.scss']
})
export class BlogsComponent implements OnInit {
  searchTerm: string = '';
  selectedCategory: string = 'all';  // فلترة حسب التصنيف

  blogs : any[] = [];


  comments: any[]= [];
  constructor(private blogService : BlogService , private commentService : CommentsService){}
  ngOnInit(): void {

    this.blogService.getAllBlogs().subscribe({
      next:(data) =>{
        this.blogs= data;
        // console.log(this.blogs);
        
      },
      error:(data) =>{
        // console.log("error", data);
        
      }
    })

    this.commentService.getAllComments().subscribe({
      next:(data) =>{
        this.comments= data;
        // console.log('comment',this.comments);
        
      },
      error:(data) =>{
        // console.log("error", data);
        
      }
    })
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
