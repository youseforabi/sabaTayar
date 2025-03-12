import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-withdrawals',
    standalone:true,

    imports: [CommonModule, RouterModule],
    templateUrl: './withdrawals.component.html',
    styleUrl: './withdrawals.component.scss'
})
export class WithdrawalsComponent {
  constructor() {
  }
  transactions = [
    { amount: '$50.00', method: 'Stripe', to: 'test@gmail.com', date: 'January 7, 2019', status: 'Completed' },
    { amount: '$100.00', method: 'Stripe', to: 'test@gmail.com', date: 'January 7, 2019', status: 'Completed' },
    { amount: '$100.00', method: 'Stripe', to: 'test@gmail.com', date: 'January 7, 2019', status: 'Completed' },
    { amount: '$100.00', method: 'Stripe', to: 'test@gmail.com', date: 'January 7, 2019', status: 'Completed' },
    { amount: '$100.00', method: 'Stripe', to: 'test@gmail.com', date: 'January 7, 2019', status: 'Completed' },
    { amount: '$100.00', method: 'Stripe', to: 'test@gmail.com', date: 'January 7, 2019', status: 'Completed' }
  ];
}
