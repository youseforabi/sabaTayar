import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faFacebook, faTwitter, faInstagram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-footer',
    standalone:true,

    imports: [CommonModule],
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  faFacebook = faFacebook;
  faTwitter = faTwitter;
  faInstagram = faInstagram;
  faWhatsapp = faWhatsapp;

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
