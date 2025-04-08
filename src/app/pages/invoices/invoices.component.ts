import { CommonModule, DatePipe, NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Invoice } from '../../Intrerfaces/Invoice';
import { InvoiceService } from '../../services/Invoice/invoice.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoices',
  standalone: true,
  imports: [NgFor, RouterModule, CommonModule, DatePipe ,FormsModule],
  templateUrl: './invoices.component.html',
  styleUrl: './invoices.component.scss',
})
export class InvoicesComponent implements OnInit {
  filters: string[] = ['All', 'Deleted'];
  originalInvoices: Invoice[] = [];
  Invoices: Invoice[] = [];

  startDate: string = '';  // تخزين تاريخ البداية
  endDate: string = '';    // تخزين تاريخ النهاية
  currentPage: number = 1; // الصفحة الحالية
  itemsPerPage: number = 10; // عدد العناصر في الصفحة الواحدة

  constructor(private invoiceService: InvoiceService) {}

  ngOnInit(): void {
    this.fetchInvoices();
  }
  getDisplayedInvoices(): Invoice[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = this.currentPage * this.itemsPerPage;
    return this.Invoices.slice(startIndex, endIndex);
  }
  getEntriesInfoText(): string {
    const totalInvoices = this.Invoices.length;
    const displayedInvoices = this.getDisplayedInvoices().length;
    const start = (this.currentPage - 1) * this.itemsPerPage + 1;
    const end = Math.min(start + displayedInvoices - 1, totalInvoices);
    return `Showing ${start} to ${end} of ${totalInvoices} entries`;
  }
  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'completed';
      case 'Pending': return 'pending';
      case 'Failed': return 'failed';
      case 'Rejected': return 'rejected';
      case 'OnReview': return 'on-review';
      case 'Canceled': return 'canceled';
      default: return '';
    }
  }
  filter(status: string) {
    if (status === 'All') {
      this.startDate = ''; // إعادة ضبط تاريخ البداية
      this.endDate = ''; // إعادة ضبط تاريخ النهاية
      this.Invoices = [...this.originalInvoices]; // عرض جميع الفواتير
    } else {
      this.Invoices = this.originalInvoices.filter(invoice => invoice.status === status);
    }
  }
  
  

  applyDateFilter(): void {
    if (!this.startDate && !this.endDate) {
      this.Invoices = [...this.originalInvoices]; // إذا لم يتم تحديد تواريخ، اعرض كل الفواتير
      return;
    }
  
    this.Invoices = this.originalInvoices.filter(invoice => {
      const invoiceDate = new Date(invoice.issueDate);
      const start = this.startDate ? new Date(this.startDate) : null;
      const end = this.endDate ? new Date(this.endDate) : null;
  
      return (!start || invoiceDate >= start) && (!end || invoiceDate <= end);
    });
  }
  fetchInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data: Invoice[]) => {
        this.originalInvoices = data;
        this.Invoices = [...data];
        this.startDate = ''; // إعادة ضبط تاريخ البداية
        this.endDate = ''; // إعادة ضبط تاريخ النهاية
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      }
    });
  }
}
