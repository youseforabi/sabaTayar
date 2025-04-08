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

    getBookingsCount(): Observable<number> {
      return this.http.get<number>(`${this.baseUrl}/GetBookingsCount`);
    }

    getToursCount(): Observable<number>{
      return this.http.get<number>(`${this.baseUrl}/GetToursCount`)
    }

    getUsersCount(): Observable<number>{
      return this.http.get<number>(`${this.baseUrlApi}/ManageUser/GetUserCounts`)
    }
    // getTotalWalletBalance(): Observable<number>{
    //   return this.http.get<number>(`${this.baseUrl}/GetTotalWalletBalance`)
    // }


    // createTour(tourData: any): Observable<any> {
    //   const headers = new HttpHeaders().set('Content-Type', 'application/json');
    //   return this.http.post(`http://sabatoursapi.runasp.net/api/Tour`, JSON.stringify(tourData), { headers });
    // }

    createTour(tourData: any): Observable<any> {
      return this.http.post<any>(`http://sabatoursapi.runasp.net/api/Tour`, tourData);
    }


  }
