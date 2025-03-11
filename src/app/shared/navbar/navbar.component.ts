import { Component } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faSignInAlt, faPlus, faShoppingCart, faHeart, faSearch, faHome, faLandmark, faMapMarkedAlt, faNewspaper, faInfoCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule,FontAwesomeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  faSignInAlt = faSignInAlt;
  faPlus = faPlus;
  faShoppingCart = faShoppingCart;
  faHeart = faHeart;
  faSearch = faSearch;
  faHome = faHome;
  faLandmark = faLandmark;
  faMapMarkedAlt = faMapMarkedAlt;
  faNewspaper = faNewspaper;
  faInfoCircle = faInfoCircle;

  

}
