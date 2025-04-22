import { NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CommentsService } from '../../services/comment/comments.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-comments',
    standalone:true,
    imports: [NgFor],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  // filters: string[] = ['Guide Of Egypt', 'Classical Tour', 'Day Trip' ,'Deleted Comment' ];
  // selectedFilter: string = 'Guide Of Egypt';
  commentsService = inject(CommentsService);  // حقن الخدمة هنا باستخدام inject
  toastr = inject(ToastrService)
  comments = [];

  ngOnInit(): void {
    // this.filter('Guide Of Egypt'); 
    this.loadComments();

  }

  loadComments() {
    this.commentsService.getAllCommentsForTours().subscribe({
      next: (data) => {
        // console.log('Loaded comments:', data);
        this.comments = data;
        // this.filter(this.selectedFilter); // تطبيق الفلتر بعد تحميل البيانات
      },
      error: (err) => {
        console.error('Error loading comments:', err);
      }
    });
  }

  // filteredComment = this.comments;
  // filter(type: string) {
  //   this.filteredComment = this.comments.filter(comment => comment.type === type);
  //   this.selectedFilter = type;

  // }
  deleteComment(id: number): void {
    this.commentsService.deleteCommentById(id).subscribe({
      next: () => {
        // تحديث القائمة بعد الحذف
        this.comments = this.comments.filter(comment => comment.id !== id);
  
        // إظهار رسالة تأكيد بالتوستر
        this.toastr.success('Comment deleted successfully!', 'Deleted');
      },
      error: (err) => {
        this.toastr.error('Failed to delete comment.', 'Error');
      }
    });
  }
  

}
