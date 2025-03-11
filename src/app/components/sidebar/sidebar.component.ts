import { Component, EventEmitter, HostListener, Output, output } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faTachometerAlt, faComments, faList, faCalendarCheck, faComment, faWallet, faFileInvoice, faCog, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, NgFor, FontAwesomeModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Output() titleChange = new EventEmitter<string>();
  isCollapsed = window.innerWidth <= 768; // يبدأ مغلقًا على الشاشات الصغيرة
  isOpen = false; // للتحكم في ظهور السايدبار فوق المحتوى

  menuItems = [
    { label: 'Dashboard', icon: faTachometerAlt, route: '/dashboard' },
    { label: 'Chats', icon: faComments, route: '/dashboard/chat' },
    { label: 'My Tours', icon: faList, route: '/dashboard/myToors' },
    { label: 'My Booking', icon: faCalendarCheck, route: '/dashboard/myBooking' },
    { label: 'Comments', icon: faComment, route: '/dashboard/comments' },
    { label: 'Withdrawals', icon: faWallet, route: '/dashboard/withdrawals' },
    { label: 'Invoices', icon: faFileInvoice, route: '/dashboard/invoices' },
    { label: 'Settings', icon: faCog, route: '/dashboard/settings' }
  ];

  constructor(private router: Router, private library: FaIconLibrary) {
    library.addIcons(faBell, faTachometerAlt, faComments, faList, faCalendarCheck, faComment, faWallet, faFileInvoice, faCog, faBars, faTimes);
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
