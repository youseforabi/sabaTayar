import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone:true,

    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  email:string= 'info@sabatours.com'
  phoneNumber: string = '201000676285';

  callPhone() {
    window.location.href = `tel:${this.phoneNumber}`;
  }

  sendEmail() {
    window.location.href = `mailto:${this.email}`;
  }
  showNavBarFooter: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      const url = this.router.url;
      this.showNavBarFooter = !(
        url.startsWith('/dashboard') ||
        url.startsWith('/login') ||
        url.startsWith('/register')
      );
    });
  }
}
