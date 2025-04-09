import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogHomeService } from '../../../services/blogHome/blog-home.service';
import { BlogPostSideBarComponent } from '../../blog-post-side-bar/blog-post-side-bar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../services/Auth/auth.interceptor';
import { ToastrService } from 'ngx-toastr';

interface Comment {
  userName: string;
  profilePicture: string;
  content: string;
  createdAt: string;
}

interface BlogPost {
  id: number;
  title: string;
  description: string;
  createdAt: string;
  createdBy: string;
  mainImage: string;
  headerImages: string[];
  category: string;
  places: any[];
  tags: string[];
  viewCount: number;
  comments?: Comment[];
}

@Component({
  selector: 'app-blog-details',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BlogPostSideBarComponent,
    DatePipe,
    HttpClientModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss',
})
export class BlogDetailsComponent implements OnInit {
  selectedBlog: BlogPost | null = null;
  loading = true;
  showAllComments = false;
  blogs: any[] = [];
  filteredBlogs: any[] = []; // Para almacenar los blogs filtrados sin el actual

  // نموذج التعليق الجديد
  newComment = {
    content: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router, // Agregar Router para la navegación
    private blogService: BlogHomeService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Primero obtener el ID del blog actual y sus detalles
    const blogId = +this.route.snapshot.paramMap.get('id')!;
    this.getBlogDetails(blogId);

    // Obtener todos los blogs y filtrarlos
    this.getBlogs(blogId);
  }

  // Obtener y filtrar los blogs
  getBlogs(currentBlogId: number) {
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

        // Filtrar para excluir el blog actual
        this.filteredBlogs = this.blogs.filter(
          (blog) => blog.id !== currentBlogId
        );
      },
      error: (err) => {
        console.error('Error fetching blogs:', err);
      },
    });
  }
  get mergedHeaderImages(): string[] {
    const images: string[] = [];
    const arr = this.selectedBlog?.headerImages || [];

    for (let i = 0; i < arr.length; i += 2) {
      const merged = arr[i] + (arr[i + 1] || '');
      images.push(merged);
    }

    return images;
  }

  getBlogDetails(blogId: number) {
    this.blogService.getBlogDetails(blogId).subscribe({
      next: (data) => {
        // إضافة prefix لكل صورة
        if (data.mainImage && !data.mainImage.startsWith('data:image')) {
          data.mainImage = `data:image/jpeg;base64,${data.mainImage}`;
        }

        if (data.headerImages && data.headerImages.length > 0) {
          data.headerImages = data.headerImages.map((img: string) =>
            img.startsWith('data:image') ? img : `data:image/jpeg;base64,${img}`
          );
        }

        this.selectedBlog = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching blog details:', err);
        this.loading = false;
      },
    });
  }

  // Navegar a un blog al hacer clic
  navigateToBlog(blogId: number) {
    // Guardar la posición actual de desplazamiento
    const currentScrollPosition = window.scrollY;

    // Navegar al blog seleccionado
    this.router.navigate(['/blog', blogId]).then(() => {
      // Desplazarse a la parte superior de la página después de la navegación
      window.scrollTo(0, 0);

      // Actualizar los datos
      this.loading = true;
      this.getBlogDetails(blogId);
      this.getBlogs(blogId);
    });
  }

  toggleComments() {
    this.showAllComments = !this.showAllComments;
  }

  submitComment() {
    if (!this.newComment.content.trim()) return;

    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No token found. Please log in.');
      return;
    }

    if (!this.selectedBlog?.id) {
      console.error('Blog ID is missing');
      return;
    }

    const commentData = {
      content: this.newComment.content,
      blogId: this.selectedBlog.id,
    };

    this.blogService.addComment(commentData).subscribe({
      next: (response: any) => {

        // إنشاء كائن تعليق جديد مع البيانات المطلوبة
        const newComment: Comment = {
          userName: response.user?.name || 'Anonymous', // تعديل حسب هيكل الاستجابة
          profilePicture:
            response.user?.profilePicture || 'assets/images/default-avatar.png',
          content: response.content,
          createdAt: response.createdAt || new Date().toISOString(),
        };

        // تحديث القائمة مع إجبار تحديث الواجهة
        if (this.selectedBlog) {
          this.selectedBlog = {
            ...this.selectedBlog,
            comments: [newComment, ...(this.selectedBlog.comments || [])],
          };

          this.newComment.content = '';
          this.cdr.detectChanges(); // إجبار تحديث الواجهة

          // حل إضافي: إعادة تحميل بيانات المدونة
          this.getBlogDetails(this.selectedBlog.id);
        }
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        if (error.status === 401) {
          console.error('Unauthorized: Token is invalid or expired.');
        }
      },
    });
  }
}
