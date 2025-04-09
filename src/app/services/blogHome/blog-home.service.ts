import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogHomeService {

  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getBlogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blog/home_Blogs`);
  }
  getBlogDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/blog/details/${id}`);
  }

  getBlogsCategoryHome(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blog/categories_Home`);
  }
  
  getBlogsTagsHome(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/blog/tags_Home`);
  }

  getBlogsTourCardsHome(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Tour/cards`);
  }


  addComment(commentData: any) {
    const token = localStorage.getItem('token'); // الحصول على التوكن من الـ localStorage
  
    if (!token) {
      console.error('Token not found');
      
    }  
    // إنشاء headers جديدة تتضمن التوكن
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  
    // إرسال الطلب مع التوكن في headers
    return this.http.post<any>(`${this.apiUrl}/comments`, commentData, { headers });
  }
}
