import { Component, EventEmitter, HostListener, Output, output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    standalone:true,

    imports: [CommonModule, RouterModule, NgFor],
    templateUrl: './sidebar.component.html',
    styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() titleChange = new EventEmitter<string>();
  isCollapsed = window.innerWidth <= 768; // يبدأ مغلقًا على الشاشات الصغيرة
  isOpen = false; // للتحكم في ظهور السايدبار فوق المحتوى

  menuItems = [
    { label: 'Dashboard', icon: 'bi-speedometer2', route: '/dashboard' },
    { label: 'Chats', icon: 'bi-chat-dots', route: '/dashboard/chat' },
    { label: 'My Tours', icon: 'bi-list-ul', route: '/dashboard/myToors' },
    { label: 'My Booking', icon: 'bi-calendar-check', route: '/dashboard/myBooking' },
    { label: 'Comments', icon: 'bi-chat-left-text', route: '/dashboard/comments' },
    { label: 'Withdrawals', icon: 'bi-wallet2', route: '/dashboard/withdrawals' },
    { label: 'Invoices', icon: 'bi-receipt', route: '/dashboard/invoices' },
    { label: 'Settings', icon: 'bi-gear', route: '/dashboard/settings' }
  ];
  

  constructor(private router: Router) {
  }

  sendTitle(title:string){
    this.titleChange.emit(title);

  }
  toggleSidebar() {
    if (window.innerWidth <= 768) {
      this.isOpen = !this.isOpen; // يفتح السايدبار في الشاشات الصغيرة
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }
  isActive(route: string): boolean {
    return this.router.url === route;
  }

  // تحديث عند تغيير حجم الشاشة
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isCollapsed = window.innerWidth <= 768;
    this.isOpen = false; // إغلاق السايدبار عند تغيير الحجم
  }
}
