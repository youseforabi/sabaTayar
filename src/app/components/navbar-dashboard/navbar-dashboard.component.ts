import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SettingService } from '../../services/setting/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.scss'
})
export class NavbarDashboardComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'Overview';

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

  ngOnInit(): void {
    const savedImage = localStorage.getItem('profileImage');
  this.profileImage = savedImage ? savedImage : 'assets/default-profile.png';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
