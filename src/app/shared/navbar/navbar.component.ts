import { Component, ViewChild } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { NgClass, NgIf } from '@angular/common';
import { SettingService } from '../../services/setting/setting.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  email: string = 'info@salesDraw.com';
  profileImage: string = 'assets/default-profile.png';
  private subscription: Subscription = new Subscription();
  @ViewChild('userDropdown') userDropdown: any;
  phoneNumber: string = '201000676285';

  callPhone() {
    window.location.href = `tel:${this.phoneNumber}`;
  }

  sendEmail() {
    window.location.href = `mailto:${this.email}`;
  }
  userName: string = '';
  userRole: string = '';
  isLoggedIn: boolean = false;

  constructor(
    private settingService: SettingService,
    private authService: AuthService
  ) {
    this.isLoggedIn = this.authService.isLoggedIn();
    if (this.isLoggedIn) {
      this.initializeUserData();
    }

    this.subscription.add(
      this.settingService.profileImage$.subscribe(image => {
        if (image) {
          this.profileImage = image;
          localStorage.setItem('profileImage', image);
        } else {
          this.profileImage = 'assets/default-profile.png';
          localStorage.setItem('profileImage', this.profileImage);
        }
      })
    );
  }

  ngOnInit(): void {}

  initializeUserData(): void {
    const userData = this.authService.getUserData();
    if (userData) {
      this.userName = userData.name || 'User';
      if (userData.roleId === 1) {
        this.userRole = 'Admin';
      } else if (userData.roleId === 2) {
        this.userRole = 'User';
      } else {
        this.userRole = userData.roleName || '';
      }
      if (userData.profilePicture) {
        this.profileImage = userData.profilePicture;
        localStorage.setItem('profileImage', this.profileImage);
      } else {
        const savedImage = localStorage.getItem('profileImage');
        this.profileImage = savedImage || 'assets/default-profile.png';
      }
    }
  }

  toggleDropdown(): void {
    this.userDropdown.nativeElement.classList.toggle('show');
  }

  logOut(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userName = '';
    this.userRole = '';
    this.profileImage = 'assets/default-profile.png';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}