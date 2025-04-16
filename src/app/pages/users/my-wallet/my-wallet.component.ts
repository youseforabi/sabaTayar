import { Component } from '@angular/core';
import { AuthService } from '../../../services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-wallet',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './my-wallet.component.html',
  styleUrl: './my-wallet.component.scss',
})
export class MyWalletComponent {
  wallets: any[] = [];
  walletBalance : number = 0; 
  totalRefunds : number = 0; 
  totalDueAmount : number = 0; 
  isLoading = true;

  currentPage: number = 1;
  pageSize: number = 10; // عدد العناصر لكل صفحة
  totalEntries: number = 0; // إجمالي عدد العناصر

  startDate: string = '';
  endDate: string = '';
  filteredTransactions: any[] = []; // حقل لتخزين المعاملات المفلترة

  constructor(
    private authService: AuthService,
    private toastr: ToastrService
  ) {}

  filterByDate(): void {
    if (this.startDate && this.endDate) {
      const start = new Date(this.startDate);
      const end = new Date(this.endDate);
      
      this.filteredTransactions = this.wallets.filter(transaction => {
        const transactionDate = new Date(transaction.paymentDate);
        return transactionDate >= start && transactionDate <= end;
      });
    } else {
      this.filteredTransactions = [...this.wallets];
    }
    
    this.totalEntries = this.filteredTransactions.length;
  }

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
    this.authService.fetchWallet().subscribe({
      next: (data) => {
        this.wallets = data.payments || []; // استخدم payments بدلاً من data مباشرة
        console.log(this.wallets);
  
        this.walletBalance = data.walletBalance ?? 0;
        this.totalRefunds = data.totalRefunds ?? 0;
        this.totalDueAmount = data.totalDueAmount ?? 0;
  
        this.filterByDate();
        this.isLoading = false;
      },
      error: (err) => {
        this.toastr.error('Error fetching Wallet', 'Error');
        this.isLoading = false;
      },
    });
  }
}
