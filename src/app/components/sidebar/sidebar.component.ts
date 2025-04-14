import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'] // ✅ تم تصحيح المسار
})
export class SidebarComponent {
  @Output() titleChange = new EventEmitter<string>();

  isCollapsed = window.innerWidth <= 768; 
  isOpen = false; 

  menuItems = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
    { label: 'User Management', icon: 'bi-person', route: '/dashboard/user-management' },
    { label: 'Live Chat', icon: 'bi-chat-dots', route: '/dashboard/chat' },
    { label: 'All Tours', icon: 'bi-list-ul', route: '/dashboard/myToors' },
    { label: 'All Booking', icon: 'bi-calendar-check', route: '/dashboard/myBooking' },
    { label: 'All Comments', icon: 'bi-chat-left-text', route: '/dashboard/comments' },
    { label: 'My Wallet', icon: 'bi-wallet2', route: '/dashboard/withdrawals' },
    { label: 'Invoices', icon: 'bi-receipt', route: '/dashboard/invoices' },

    { label: 'Blogs', icon: 'bi-gear', route: '/dashboard/blogs' },

    { label: 'Ads Manager', icon: 'bi-megaphone', route: '/dashboard/adsManager' },
    { label: 'Settings', icon: 'bi-gear', route: '/dashboard/settings' },
  ];

  constructor(private router: Router) {}

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
