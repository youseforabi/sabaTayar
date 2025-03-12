import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-invoices',
    standalone:true,

    imports: [NgFor],
    templateUrl: './invoices.component.html',
    styleUrl: './invoices.component.scss'
})
export class InvoicesComponent {
  transactions = [
    { 'ID': '$50.00', 'AD Package': 'Stripe', 'For Listing': 'test@gmail.com', 'End Date': 'January 7, 2019', 'status': 'Pending' },
    { 'ID': '$100.00', 'AD Package': 'Stripe', 'For Listing': 'test@gmail.com', 'End Date': 'January 7, 2019', 'status': 'Completed' },
    { 'ID': '$100.00', 'AD Package': 'Stripe', 'For Listing': 'test@gmail.com', 'End Date': 'January 7, 2019', 'status': 'Completed' },
    { 'ID': '$100.00', 'AD Package': 'Stripe', 'For Listing': 'test@gmail.com', 'End Date': 'January 7, 2019', 'status': 'Completed' },
    { 'ID': '$100.00', 'AD Package': 'Stripe', 'For Listing': 'test@gmail.com', 'End Date': 'January 7, 2019', 'status': 'Canceled' },
    { 'ID': '$100.00', 'AD Package': 'Stripe', 'For Listing': 'test@gmail.com', 'End Date': 'January 7, 2019', 'status': 'Completed' }
  ];

}
