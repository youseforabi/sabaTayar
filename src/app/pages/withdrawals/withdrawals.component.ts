import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, take, tap } from 'rxjs';
import { PaymentService } from '../../services/payment/payment.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-withdrawals',
    standalone:true,

    imports: [CommonModule, RouterModule,FormsModule],
    templateUrl: './withdrawals.component.html',
    styleUrls: ['./withdrawals.component.scss'] // ✅ هنا كان الخطأ
  })
export class WithdrawalsComponent implements OnInit  {
  myWalletBalance : number = 0; 
  allRefunds : number = 0; 
  paymentLastWeek : number = 0; 
  
  currentPage: number = 1;
    pageSize: number = 10; // عدد العناصر لكل صفحة
    totalEntries: number = 0; // إجمالي عدد العناصر

    startDate: string = '';
    endDate: string = '';
  
   
    constructor(private dashboardService: DashboardService,private paymentService : PaymentService) {}
    transactions: any[] = []; // تعريف المصفوفة لاستقبال البيانات من API
    filteredTransactions: any[] = [];


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

  ngOnInit(): void {
    // this.getTotalWalletBalance();
    this.fetchDashStats();
    this.fetchPayments(); 
  }
  fetchPayments(): void {
    this.paymentService.getAllPayments()
      .pipe(
        take(1),
        tap((data) => {
          console.log('Fetched Payments:', data);
          this.totalEntries = data.length; 
        }),
        catchError((err) => {
          console.error('Error fetching payments:', err);
          return of([]);
        })
      )
      .subscribe((data) => this.transactions = data.slice(0, this.pageSize)); 
  }
  filterByDate(): void {
    if (this.startDate && this.endDate) {
        this.filteredTransactions = this.transactions.filter(transaction => {
            const transactionDate = new Date(transaction.paymentDate);
            const start = new Date(this.startDate);
            const end = new Date(this.endDate);
            return transactionDate >= start && transactionDate <= end;
        });
    } else {
        this.filteredTransactions = [...this.transactions]; // إذا لم يتم اختيار تاريخ، عرض كل المعاملات
    }
}

  fetchDashStats(): void {
    this.paymentService.getAllDashStats()
      .pipe(
        take(1),
        tap((data: any) => { // تأكد من أن data هو كائن
          console.log('Fetched Dashboard Stats:', data);
  
          // ✅ استخراج القيم الصحيح  ة من الكائن
          this.myWalletBalance = this.extractCurrencyValue(data.myWalletBalance);
          this.allRefunds = this.extractCurrencyValue(data.allRefunds);
          this.paymentLastWeek = this.extractCurrencyValue(data.paymentLastWeek);
        }),
        catchError((err) => {
          console.error('Error fetching dashboard stats:', err);
          return of({ myWalletBalance: "$0", allRefunds: "$0", paymentLastWeek: "$0" }); // ✅ تعيين قيم افتراضية عند حدوث خطأ
        })
      )
      .subscribe();
  }
  
  
  // دالة لاستخراج القيمة العددية فقط
  extractCurrencyValue(value: string): number {
    return Number(value.replace(/[^0-9.]/g, '')); // إزالة أي رمز نقدي وتحويله لرقم
  }
  
  
  loadMore(): void {
    const nextPage = this.currentPage + 1;
    
    this.paymentService.getAllPayments()
      .pipe(
        take(1),
        tap((data) => {
          console.log('Loading More Payments:', data);
          
          const startIndex = this.currentPage * this.pageSize;
          const endIndex = startIndex + this.pageSize;
          
          if (startIndex < this.totalEntries) {
            this.transactions = [...this.transactions, ...data.slice(startIndex, endIndex)];
            this.currentPage = nextPage;
          }
        }),
        catchError((err) => {
          console.error('Error loading more payments:', err);
          return of([]);
        })
      )
      .subscribe();
  }
  
  getDisplayedEntries(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalEntries);
  }

  // getTotalWalletBalance(): void {
  //       this.dashboardService.getTotalWalletBalance()
  //         .pipe(
  //           take(1), // ينهي الاشتراك بعد استدعاء واحد
  //           tap(), // تسجيل القيمة في الكونسول
  //           catchError((err) => {
  //             console.error('Error fetching bookings count:', err);
  //             return of(0);
  //           })
  //         )
  //         .subscribe((count) => this.totalWalletBalance = count);
  //     }
}
