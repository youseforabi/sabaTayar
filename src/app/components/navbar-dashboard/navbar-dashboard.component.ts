import { Component, OnInit, OnDestroy, Input, HostListener } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { SettingService } from '../../services/setting/setting.service';
import { DashboardService } from '../../services/dashboard.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/Auth/auth.service';
import { catchError, take, tap } from 'rxjs/operators';
import { of } from 'rxjs';

interface RecentActivity {
  description: string;
  date: string;
  type?: string;
}

@Component({
  selector: 'app-navbar-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './navbar-dashboard.component.html',
  styleUrl: './navbar-dashboard.component.scss'
})
export class NavbarDashboardComponent implements OnInit, OnDestroy {
  @Input() pageTitle: string = 'Overview';
  private DEFAULT_PROFILE_IMAGE = 'assets/WhatsApp Image 2025-04-24 at 14.52.36_a522ea2e.jpg';

  
  @HostListener('document:click', ['$event'])
  handleClickOutside(event: Event) {
    const notificationIcon = document.querySelector('.notification');
    const notificationsDropdown = document.querySelector('.notifications-dropdown');
    
    if (
      this.isNotificationOpen && 
      notificationIcon && 
      notificationsDropdown && 
      !notificationIcon.contains(event.target as Node) && 
      !notificationsDropdown.contains(event.target as Node)
    ) {
      this.isNotificationOpen = false;
    }
  }

  profileImage!: string;
  userName: string = '';
  userRole: string = '';
  isDropdownOpen: boolean = false;
  isNotificationOpen: boolean = false;
  recentActivities: RecentActivity[] = [];
  unreadNotificationsCount: number = 0;
  showNotifications: boolean = false;

  private subscription: Subscription = new Subscription();

  constructor(
    private settingService: SettingService,
    private authService: AuthService,
    private dashboardService: DashboardService
  ) {
    // Initialize profile image
    const storedImage = localStorage.getItem('profileImage');
    this.profileImage = storedImage ? storedImage : this.DEFAULT_PROFILE_IMAGE;

    // Subscribe to profile image changes
    this.subscription.add(
      this.settingService.profileImage$.subscribe(image => {
        this.profileImage = image;
        localStorage.setItem('profileImage', image);
      })
    );
  
    // Get user data for name and role
    const userData = this.authService.getUserData();
    if (userData) {
      this.userName = userData.name || 'User';
      // Map role ID to role name
      if (userData.roleId === 1) {
        this.userRole = 'Admin';
        this.showNotifications = true;
      } else if (userData.roleId === 2) {
        this.userRole = 'User';
        this.showNotifications = false;
      } else {
        this.userRole = userData.roleName || '';
        // Add specific roles that can see notifications
        this.showNotifications = ['manager', 'admin', 'supervisor'].some(
          role => this.userRole.toLowerCase().includes(role)
        );
      }
    }
  }

  ngOnInit(): void {
    const savedImage = localStorage.getItem('profileImage');
    this.profileImage = savedImage ? savedImage : this.DEFAULT_PROFILE_IMAGE;

    // Fetch recent activities only if notifications are allowed
    if (this.showNotifications) {
      this.fetchRecentActivities();
    }
  }
  resetToDefaultImage(): void {
    this.profileImage = this.DEFAULT_PROFILE_IMAGE;
    localStorage.removeItem('profileImage');
  }
  fetchRecentActivities(): void {
    this.dashboardService.getRecentActivities()
      .pipe(
        take(1),
        tap(response => {
          console.log('Recent Activities:', response);
        }),
        catchError((err) => {
          console.error('Error fetching recent activities:', err);
          return of([]);
        })
      )
      .subscribe((activities: RecentActivity[]) => {
        // Sort activities by date from newest to oldest and take first 4
        this.recentActivities = activities.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }).slice(0, 4);

        // Count unread notifications
        this.unreadNotificationsCount = this.recentActivities.length;
      });
  }

  toggleNotifications(): void {
    if (this.showNotifications) {
      this.isNotificationOpen = !this.isNotificationOpen;
      
      // If opening notifications, mark as read
      if (this.isNotificationOpen) {
        this.unreadNotificationsCount = 0;
      }
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logOut(): void {
    this.authService.logout();
  }
}