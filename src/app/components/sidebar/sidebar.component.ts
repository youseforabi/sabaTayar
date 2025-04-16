import { Component, EventEmitter, HostListener, Output, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/Auth/auth.service';

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
    { label: 'All Tours', icon: 'bi-list-ul', route: '/dashboard/myToors', roles: [1]  },
    { label: 'All Booking', icon: 'bi-calendar-check', route: '/dashboard/myBooking', roles: [1] },
    { label: 'My Booking', icon: 'bi-calendar-check', route: '/dashboard/myBookingUser', roles: [3] },
    { label: 'All Comments', icon: 'bi-chat-left-text', route: '/dashboard/comments', roles: [1] },
    { label: 'My Comments', icon: 'bi-chat-left-text', route: '/dashboard/myComments', roles: [3] },
    { label: 'All Wallet', icon: 'bi-wallet2', route: '/dashboard/withdrawals',roles: [1] },
    { label: 'My Wallet', icon: 'bi-wallet2', route: '/dashboard/userWithdrawal' ,roles: [3]},
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
  },    { label: 'Blogs', icon: 'bi-journal-richtext', route: '/dashboard/blogs', roles: [1]  },
    // { label: 'Add New Blog', icon: 'bi-file-earmark-plus', route: '/dashboard/add-new-blog', roles: [1] }, // Admin only
    // { label: 'Add New Tour', icon: 'bi-plus-circle', route: '/dashboard/add-new-tour', roles: [1] }, // Admin only
    { label: 'Ads Manager', icon: 'bi-megaphone', route: '/dashboard/adsManager', roles: [1] }, // Admin only
    { label: 'Settings', icon: 'bi-gear', route: '/dashboard/settings' },
  ];
  
  // This will hold the filtered menu items based on user role
  menuItems: MenuItem[] = [];

  constructor(private router: Router, private authService: AuthService) {}
  
  ngOnInit(): void {
    this.userRole = this.authService.getUserRole();
    this.filterMenuItems();
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
    return this.router.url === route;
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