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
 
   getAllComments(): Observable<any[]> {
     return this.http.get<any[]>(`${this.baseUrl}/comments`);
   }
 
}
