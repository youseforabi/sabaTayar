import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Invoice } from '../../Intrerfaces/Invoice';
import { InvoiceService } from '../../services/Invoice/invoice.service';

@Component({
    selector: 'app-invoices',
    standalone:true,

    imports: [NgFor,RouterModule],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent implements OnInit {
  filters: string[] = ['All', 'Deleted'];

  originalInvoices: Invoice[] = []; 
  Invoices: Invoice[] = [];



  constructor(private invoiceService: InvoiceService) {}
  ngOnInit(): void {
    this.fetchInvoices();
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'Completed': return 'completed';
      case 'Pending': return 'pending';
      case 'Failed': return 'failed';
      case 'Rejected': return 'rejected';
      case 'On progress': return 'on-progress';
      case 'Canceled': return 'Canceled';
      case 'Refund': return 'refund';
      case 'Deleted': return 'Deleted';
      case 'On Review': return 'on-review';
      default: return '';
    }
  }

  filter(status: string) {
    if (status === 'All') {
      this.Invoices = [...this.originalInvoices.filter(invoice => invoice.status !== 'Deleted')];
    } else {
      this.Invoices = [...this.originalInvoices.filter(invoice => invoice.status === status)];
    }
  }

  fetchInvoices(): void {
    this.invoiceService.getInvoices().subscribe({
      next: (data: Invoice[]) => {
        console.log('Fetched Invoices:', data); // ✅ طباعة البيانات المستلمة
        this.originalInvoices = data;
        this.Invoices = [...this.originalInvoices]; 
      },
      error: (error) => {
        console.error('Error fetching invoices:', error);
      }
    });
  }
  
}
