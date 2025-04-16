// navbar-dashboard.component.ts
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SettingService } from '../../services/setting/setting.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/Auth/auth.service';

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule,NgIf],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.scss'
})
export class NavbarDashboardComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'Overview';

  profileImage!: string;
  userName: string = '';
  userRole: string = '';
  isDropdownOpen: boolean = false;
  private subscription: Subscription;

  constructor(
    private settingService: SettingService,
    private authService: AuthService
  ) {
    // Initialize profile image
    const storedImage = localStorage.getItem('profileImage');
    this.profileImage = storedImage ? storedImage : 'assets/default-profile.png';

    // Subscribe to profile image changes
    this.subscription = this.settingService.profileImage$.subscribe(image => {
      this.profileImage = image;
      localStorage.setItem('profileImage', image);
    });

    // Get user data for name and role
    const userData = this.authService.getUserData();
    if (userData) {
      this.userName = userData.name || 'User';
      // Map role ID to role name
      if (userData.roleId === 1) {
        this.userRole = 'Admin';
      } else if (userData.roleId === 2) {
        this.userRole = 'User';
      } else {
        this.userRole = userData.roleName || '';
      }
    }
  }

  ngOnInit(): void {
    const savedImage = localStorage.getItem('profileImage');
    this.profileImage = savedImage ? savedImage : 'assets/default-profile.png';
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  logOut():void{
    this.authService.logout()
  }
}