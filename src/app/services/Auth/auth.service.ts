import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { environment } from '../../../environment/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
    
    }
  
    register(formData: FormData): Observable<any> {
      return this.http.post(`${this.baseUrl}/Auth/register`, formData)
        .pipe(
          tap((res: any) => {
            
          }),
          catchError(this.handleError)
        );
    }
  
    login(email: string, password: string): Observable<any> {
      const formData = new FormData();
      formData.append('Email', email);
      formData.append('Password', password);
  
      return this.http.post(`${this.baseUrl}/Auth/login`, formData)
        .pipe(
          tap((res: any) => {
            if (res?.token) {
              // this.setToken(res.token);
              // console.log(res.token);
              
              
            }
          }),
          catchError(this.handleError)
        );
    }
  
 
    getToken(): string | null {
      return localStorage.getItem('token');
    }
  
    logout(): void {
      localStorage.removeItem('token');
      localStorage.removeItem('profileImage');
    }
  
    private handleError(error: HttpErrorResponse) {
      console.error('❌ Error:', error);
      return throwError(() => new Error('حدث خطأ ما، يرجى المحاولة لاحقاً'));
    }
  
    private setToken(token: string): void {
      localStorage.setItem('token', token);
    }
  // التحقق من OTP
  verifyOtp(email: string, otp: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);
    formData.append('Otp', otp);

    return this.http.post(`${this.baseUrl}/Auth/verify-otp`, formData)
      .pipe(catchError(this.handleError));
  }

  // إعادة إرسال OTP
  resendOtp(email: string): Observable<any> {
    const formData = new FormData();
    formData.append('Email', email);

    return this.http.post(`${this.baseUrl}/Auth/resend-otp`, formData)
      .pipe(catchError(this.handleError));
  }

  updateProfile(formData : FormData):Observable<any>{
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}` // لو في توكن
    });
    return this.http.put(`${this.baseUrl}/Auth/update-profile`, formData, { headers });

  }

  changePassword(OldPassword: string, NewPassword: string, ConfirmNewPassword: string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    const formData = new FormData();
    formData.append('OldPassword', OldPassword);
    formData.append('NewPassword', NewPassword);
    formData.append('ConfirmNewPassword', ConfirmNewPassword);

    return this.http.put(`${this.baseUrl}/Auth/change-password`, formData, { headers });
  }

}
