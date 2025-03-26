import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, take, tap } from 'rxjs';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule, NgFor],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  searchTerm: string = '';
  selectedStatus: string = 'all';
  usersCount : number = 0; 

  users = [
    { id: 1, image: 'assets/user1jpg.jpg', name: 'User1', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'active' },
    { id: 2, image: 'assets/user1jpg.jpg', name: 'User2', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'active' },
    { id: 3, image: 'assets/user1jpg.jpg', name: 'User3', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'blocked' },
    { id: 4, image: 'assets/user1jpg.jpg', name: 'User4', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'blocked' },
    { id: 5, image: 'assets/user1jpg.jpg', name: 'User5', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'active' },
    { id: 6, image: 'assets/user1jpg.jpg', name: 'User6', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'deleted' },
    { id: 7, image: 'assets/user1jpg.jpg', name: 'User7', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'deleted' },
    { id: 8, image: 'assets/user1jpg.jpg', name: 'User8', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'active' },
    { id: 9, image: 'assets/user1jpg.jpg', name: 'User9', email: 'email@username.com', joinDate: '2025-01-01 00:01:02', status: 'pending' },
  ];

  ngOnInit(): void {
    this.getUsersCount();
  }
  constructor(private dashboardService: DashboardService) {}

  get filteredUser() {
    return this.users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) || 
                            user.email.toLowerCase().includes(this.searchTerm.toLowerCase());

      const matchesStatus = this.selectedStatus === 'all' || user.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }

  filterUsers(status: string) {
    this.selectedStatus = status;
  }

  openChat(user: any) {
    console.log('Chat with:', user);
  }

  deleteUser(user: any) {
    this.users = this.users.filter(u => u.id !== user.id);
  }

  loadMore() {
    console.log('Load more users');
  }


  
    getUsersCount(): void {
      this.dashboardService.getUsersCount()
        .pipe(
          take(1), // ينهي الاشتراك بعد استدعاء واحد
          tap(), // تسجيل القيمة في الكونسول
          catchError((err) => {
            console.error('Error fetching bookings count:', err);
            return of(0);
          })
        )
        .subscribe((count) => this.usersCount = count);
    }
}
