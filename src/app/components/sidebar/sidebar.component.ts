import { Component, EventEmitter, HostListener, Output, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule, NavigationEnd } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';
import { filter } from 'rxjs/operators';

interface MenuItem {
  label: string;
  icon: string;
  route: string;
  roles?: number[]; // This will hold which roles can access this menu item
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Output() titleChange = new EventEmitter<string>();

  isCollapsed = window.innerWidth <= 768;
  isOpen = false;
  userRole: number | null = null;
  
  // Define all menu items with role restrictions
  allMenuItems: MenuItem[] = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
    { label: 'User Management', icon: 'bi-person', route: '/dashboard/user-management', roles: [1] }, // Admin only
    { label: 'All Tours', icon: 'bi-list-ul', route: '/dashboard/myToors', roles: [1] },
    { label: 'All Booking', icon: 'bi-calendar-check', route: '/dashboard/myBooking', roles: [1] },
    { label: 'My Booking', icon: 'bi-calendar-check', route: '/dashboard/myBookingUser', roles: [3] },
    { label: 'All Comments', icon: 'bi-chat-left-text', route: '/dashboard/comments', roles: [1] },
    { label: 'My Comments', icon: 'bi-chat-left-text', route: '/dashboard/myComments', roles: [3] },
    { label: 'All Wallet', icon: 'bi-wallet2', route: '/dashboard/withdrawals', roles: [1] },
    { label: 'My Wallet', icon: 'bi-wallet2', route: '/dashboard/userWithdrawal', roles: [3] },
    { 
      label: 'Invoices', 
      icon: 'bi-receipt', 
      route: '/dashboard/invoices',
      roles: [1] // للمدير فقط
    },
    { 
      label: 'My Invoices', 
      icon: 'bi-receipt', 
      route: '/dashboard/userInvoice',
      roles: [2, 3] // للمستخدمين العاديين والموظفين
    },
    { label: 'Blogs', icon: 'bi-journal-richtext', route: '/dashboard/blogs', roles: [1] },
    { label: 'Ads Manager', icon: 'bi-megaphone', route: '/dashboard/adsManager', roles: [1] }, // Admin only
    // { label: 'Settings', icon: 'bi-gear', route: '/dashboard/settings' },
    // { label: 'Chat', icon: 'bi-chat', route: '/dashboard/chat' },
  ];
  
  // Map for special route titles
  specialRouteTitles: { [key: string]: string } = {
    '/dashboard/add-new-blog': 'Add New Blog',
    '/dashboard/add-new-tour': 'Add New Tour',
    '/dashboard/create-new-user': 'Create New User',
    '/dashboard/add-new-booking': 'Add New Booking',
    '/dashboard/add-new-invoice': 'Add New Invoice'
  };
  
  // This will hold the filtered menu items based on user role
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.filterMenuItems();
    
    // Set the initial title based on the current route
    this.setTitleFromCurrentRoute();
    
    // Listen for route changes to update the title
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setTitleFromCurrentRoute();
    });
  }
  
  // Set the title based on the current route
  setTitleFromCurrentRoute(): void {
    const currentUrl = this.router.url;
    
    // Check if it's a special route with a dynamic ID (like edit blog)
    if (currentUrl.includes('/dashboard/add-new-blog/')) {
      this.titleChange.emit('Edit Blog');
      return;
    }
    
    // Check if it's one of our special routes
    for (const route in this.specialRouteTitles) {
      if (currentUrl.startsWith(route)) {
        this.titleChange.emit(this.specialRouteTitles[route]);
        return;
      }
    }
    
    // Check if it matches a menu item
    for (const item of this.allMenuItems) {
      if (currentUrl === item.route) {
        this.titleChange.emit(item.label);
        return;
      }
    }
    
    // Default case - extract from URL
    const urlParts = currentUrl.split('/');
    const lastPart = urlParts[urlParts.length - 1];
    
    if (lastPart) {
      // Format the title (capitalize first letter of each word, replace hyphens with spaces)
      const formattedTitle = lastPart
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      this.titleChange.emit(formattedTitle);
    } else {
      // If we're at /dashboard, set the title to Dashboard
      this.titleChange.emit('Dashboard');
    }
  }
  
  // Filter menu items based on user role
  filterMenuItems(): void {
    this.menuItems = this.allMenuItems.filter(item => {
      // If no roles specified, show to everyone
      if (!item.roles) {
        return true;
      }
      
      // Otherwise, check if user's role is in the allowed roles
      return item.roles.includes(this.userRole || 0);
    });
  }

  // Updated method to send title and handle sidebar state for mobile
  setActiveMenuAndTitle(item: MenuItem): void {
    this.titleChange.emit(item.label);
    
    // Close sidebar on mobile after selection
    if (window.innerWidth <= 768) {
      this.isOpen = false;
    }
  }

  // Original method for backward compatibility
  sendTitle(title: string) {
    this.titleChange.emit(title);
  }

  toggleSidebar() {
    if (window.innerWidth <= 768) {
      this.isOpen = !this.isOpen; // فتح السايدبار في الشاشات الصغيرة
    } else {
      this.isCollapsed = !this.isCollapsed; // تصغير السايدبار في الشاشات الكبيرة
    }
  }

  isActive(route: string): boolean {
    // For the dashboard route specifically, we need an exact match
    if (route === '/dashboard') {
      return this.router.url === '/dashboard';
    }
    
    // For other routes, we can check if the URL starts with that route
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }

  // تحديث حالة الـ Sidebar عند تغيير حجم الشاشة
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollapsed = window.innerWidth <= 768; // تصغير السايدبار في الشاشات الصغيرة
    this.isOpen = false; // إغلاق الـ Sidebar إذا كان مفتوحًا
  }

  goHome() {
    window.location.href = '/';
  }
}