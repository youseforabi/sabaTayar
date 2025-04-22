import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

 private readonly baseUrl = environment.apiUrl;
 
   constructor(private http: HttpClient) {}
 
   getAllCommentsBlogs(): Observable<any[]> {
     return this.http.get<any[]>(`${this.baseUrl}/comments/all/blogs`);
   }

   getAllComments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments`);
  }
   getAllCommentsForTours(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/comments/all/tours`);
  }
 


  deleteCommentById(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/comments/admin-delete-comment/${id}`);

  }
}
