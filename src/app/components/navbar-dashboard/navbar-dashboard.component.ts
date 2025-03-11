import { Component, Input, OnDestroy } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBell, faCog, faSearch } from '@fortawesome/free-solid-svg-icons';
import { SettingService } from '../../services/setting/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.scss'
})
export class NavbarDashboardComponent implements OnDestroy {
  @Input() pageTitle: string = 'Overview';
  faBell = faBell;
  faCog = faCog;
  faSearch = faSearch;
  profileImage!: string;
  private subscription: Subscription;

  constructor(private settingService: SettingService) {
    const storedImage = localStorage.getItem('profileImage');
    this.profileImage = storedImage ? storedImage : 'assets/default-profile.png'; 

    this.subscription = this.settingService.profileImage$.subscribe(image => {
      this.profileImage = image;
      localStorage.setItem('profileImage', image);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
