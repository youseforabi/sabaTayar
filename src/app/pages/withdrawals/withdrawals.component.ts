import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faSackDollar, faAd, faHandHoldingDollar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-withdrawals',
  standalone: true,
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  templateUrl: './withdrawals.component.html',
  styleUrl: './withdrawals.component.scss'
})
export class WithdrawalsComponent {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faSackDollar, faAd, faHandHoldingDollar);
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
