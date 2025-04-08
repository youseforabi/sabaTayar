import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {


  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;


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

  
  
}
