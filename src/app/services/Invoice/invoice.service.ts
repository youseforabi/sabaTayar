import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Invoice } from '../../Intrerfaces/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private readonly baseUrl = environment.apiUrl;
  
  constructor(private http: HttpClient) {}

  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.baseUrl}/Invoice`);
  }

  createInvoice(invoiceData: any): Observable<any> {
    return this.http.post(`https://sabatoursapi.runasp.net/api/Invoice/create`, invoiceData);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Invoice/users-emails`);
  }
}
