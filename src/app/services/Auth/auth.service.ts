import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl2 = 'http://sabatoursapi.runasp.net/api/Auth/login';
  private apiUrl = 'http://sabatoursapi.runasp.net/api/Auth/register';

  constructor(private http: HttpClient) {}

  register(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  login(Email: string, Password: string): Observable<any> {
    const headers = new HttpHeaders(); // لا تضف Content-Type لأن FormData يعالجها تلقائيًا
  
    const formData = new FormData();
    formData.append('Email', Email);
    formData.append('Password', Password);
  
    return this.http.post(this.apiUrl2, formData, { headers }).pipe(
      tap((res: any) => {
        console.log('✅ Login Response:', res);
        if (res.token) {
          localStorage.setItem('token', res.token);
        }
      })
    );
  }
  
  

  getToken(): string | null {
    return localStorage.getItem('token'); // ✅ جلب التوكن عند الحاجة
  }

  logout(): void {
    localStorage.removeItem('token'); // ✅ حذف التوكن عند تسجيل الخروج
  }

}
