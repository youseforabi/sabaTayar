import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;
  getBookings(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/TourBooking/get-bookings`);
  }
}
