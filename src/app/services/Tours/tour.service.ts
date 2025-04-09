import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {


  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  bookTour(bookData: any): Observable<any> {
    const token = localStorage.getItem('token');
  
  if (!token) {
    return throwError(() => new Error('Token not found'));
  }

  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

  return this.http.post<any>(`${this.apiUrl}/TourBooking/book`, bookData, { headers });
  }
  submitTourData(tourData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/Tour`, tourData);
  }


  getAllTours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Tour`);
  }

  getDeletedTours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Tour/deleted`);
  }

  deleteTour(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Tour/${id}`);
  }

  restoreTour(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/Tour/restore/${id}`, {});
  }

  deletePermanently(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Tour/permanent/${id}`);
  }


  getAllToursWithComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Tour/all-tours-with-comments`);
  }

  getTopTags(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Tour/TopTags`);
  }

  getRecentComment(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Tour/RecentComments`);
  }

  getTourDetails(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Tour/details_Tour/${id}`);
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
