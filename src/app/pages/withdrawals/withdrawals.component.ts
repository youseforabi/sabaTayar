import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, take, tap } from 'rxjs';

@Component({
    selector: 'app-withdrawals',
    standalone:true,

    imports: [CommonModule, RouterModule],
    templateUrl: './withdrawals.component.html',
    styleUrls: ['./withdrawals.component.scss'] // ✅ هنا كان الخطأ
  })
export class WithdrawalsComponent {
  totalWalletBalance : number = 0; 

  
    ngOnInit(): void {
      this.getTotalWalletBalance();
    }
    constructor(private dashboardService: DashboardService) {}
  transactions = [
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Visa', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$50.00', status: 'Completed' },
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Mastercard', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$100.00', status: 'Pending' },
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Cash', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$100.00', status: 'Failed' },
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Manual', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$100.00', status: 'Rejected' },
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Bank transfer', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$100.00', status: 'On progress' },
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Cash', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$100.00', status: 'Refund' },
    { username: 'Username', 'User Email': 'test@gmail.com', method: 'Visa', 'Payment Date': 'March 13, 2025 1:46 am', amount: '$100.00', status: 'Rejected' }
  ];

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'completed';
      case 'Pending': return 'pending';
      case 'Failed': return 'failed';
      case 'Rejected': return 'rejected';
      case 'On progress': return 'on-progress';
      case 'Refund': return 'refund';
      default: return '';
    }
  }

  getTotalWalletBalance(): void {
        this.dashboardService.getTotalWalletBalance()
          .pipe(
            take(1), // ينهي الاشتراك بعد استدعاء واحد
            tap(), // تسجيل القيمة في الكونسول
            catchError((err) => {
              console.error('Error fetching bookings count:', err);
              return of(0);
            })
          )
          .subscribe((count) => this.totalWalletBalance = count);
      }
}
