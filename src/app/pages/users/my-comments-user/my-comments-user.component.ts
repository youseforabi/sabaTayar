import { Component, inject } from '@angular/core';
import { AuthService } from '../../../services/Auth/auth.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-my-comments-user',
  standalone:true,
  imports: [NgFor], 
   templateUrl: './my-comments-user.component.html',
  styleUrl: './my-comments-user.component.scss'
})
export class MyCommentsUserComponent {

   authService = inject(AuthService);  // حقن الخدمة هنا باستخدام inject
  
    comments = [];


    
  ngOnInit(): void {
    // this.filter('Guide Of Egypt'); 
    this.loadComments();

  }

  loadComments() {
    this.authService.fetchComments().subscribe({
      next: (data) => {
        // console.log('Loaded comments:', data);
        this.comments = data;
        console.log(this.comments);
        
        // this.filter(this.selectedFilter); // تطبيق الفلتر بعد تحميل البيانات
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }
}
