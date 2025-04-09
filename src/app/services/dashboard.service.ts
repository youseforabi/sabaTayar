import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    private readonly baseUrl = environment.apiUlrDashboard;
    private readonly baseUrlApi = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getAllDashCount(): Observable<{ tourCount: number, bookingCount: number, commentCount: number }> {
      return this.http.get<{ tourCount: number, bookingCount: number, commentCount: number }>(`${this.baseUrl}/summary`);
    }

    // getToursCount(): Observable<number>{
    //   return this.http.get<number>(`${this.baseUrl}/tour-statistics`)
    // }

    getUsersCount(): Observable<number>{
      return this.http.get<number>(`${this.baseUrlApi}/ManageUser/GetUserCounts`)
    }
    getRecentActivities(): Observable<any[]> {
      return this.http.get<any[]>(`${this.baseUrl}/recent-activities`); // تأكد من أن الـ API يعيد الأنشطة
    }
    // getTotalWalletBalance(): Observable<number>{
    //   return this.http.get<number>(`${this.baseUrl}/GetTotalWalletBalance`)
    // }


    // createTour(tourData: any): Observable<any> {
    //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //   return this.http.post(`http://sabatoursapi.runasp.net/api/Tour`, JSON.stringify(tourData), { headers });
    // }

    createTour(tourData: any): Observable<any> {
      
      return this.http.post<any>(`https://sabatoursapi.runasp.net/api/Tour`, tourData);
    }


  }
