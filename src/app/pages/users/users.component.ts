import { Component } from '@angular/core';
import { AuthService } from '../../services/Auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, DatePipe, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-users',
    standalone:true,

    imports: [NgIf,NgFor,DatePipe,FormsModule,CommonModule],
    templateUrl: './users.component.html',
    styleUrl: './users.component.scss'
})
export class UsersComponent {
    invoices: any[] = [];
    isLoading = true;
    currentPage: number = 1; // الصفحة الحالية
  itemsPerPage: number = 10; // عدد العناصر في الصفحة الواحدة
  statusOptions: string[] = ['Pending', 'OnReview', 'Completed', 'Failed', 'Rejected', 'Canceled'];
  startDate: string = '';  // تخزين تاريخ البداية
  endDate: string = '';    // تخزين تاريخ النهاية
    filters: string[] = ['All', 'Deleted'];
    originalInvoices: any[] = [];
    constructor(
      private authService: AuthService,
      private toastr: ToastrService
    ) {}
  
    ngOnInit(): void {
      this.authService.fetchInvoices().subscribe({
        next: (data) => {
          this.invoices = data;
          this.originalInvoices = [...data]; // Store original data
          this.isLoading = false;
        },
        error: (err) => {
          this.toastr.error('Error fetching invoices', 'Error');
          this.isLoading = false;
        }
      });
    }
    
    filter(status: string) {
      if (status === 'All') {
        this.startDate = ''; // إعادة ضبط تاريخ البداية
        this.endDate = ''; // إعادة ضبط تاريخ النهاية
        this.invoices = [...this.originalInvoices]; // عرض جميع الفواتير
      } else {
        this.invoices = this.originalInvoices.filter(invoice => invoice.status === status);
      }
    }
    
    
    applyDateFilter(): void {
      // Reset to original data first
      this.invoices = [...this.originalInvoices];
      
      if (!this.startDate && !this.endDate) {
        return; // No filtering needed
      }
      
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;
      
      // If we have start/end dates, normalize them to midnight for proper comparison
      if (start) start.setHours(0, 0, 0, 0);
      if (end) end.setHours(23, 59, 59, 999); // End of day
      
      this.invoices = this.invoices.filter(invoice => {
        const invoiceDate = new Date(invoice.issueDate);
        invoiceDate.setHours(0, 0, 0, 0); // Normalize invoice date
        
        // Check if date is within range
        const afterStart = !start || invoiceDate >= start;
        const beforeEnd = !end || invoiceDate <= end;
        
        return afterStart && beforeEnd;
      });
    }
    getStatusClass(status: string): string {
      switch (status) {
        case 'Pending':
          return 'status-pending';
        case 'OnReview':
          return 'status-review';
        case 'Completed':
          return 'status-completed';
        case 'Failed':
          return 'status-failed';
        case 'Rejected':
          return 'status-rejected';
        case 'Canceled':
          return 'status-canceled';
        default:
          return '';
      }
    }
     getDisplayedInvoices(): any[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = this.currentPage * this.itemsPerPage;
        return this.invoices.slice(startIndex, endIndex);
      }
    getEntriesInfoText(): string {
      const totalInvoices = this.invoices.length;
      const displayedInvoices = this.getDisplayedInvoices().length;
      const start = (this.currentPage - 1) * this.itemsPerPage + 1;
      const end = Math.min(start + displayedInvoices - 1, totalInvoices);
      return `Showing ${start} to ${end} of ${totalInvoices} entries`;
    }

}
