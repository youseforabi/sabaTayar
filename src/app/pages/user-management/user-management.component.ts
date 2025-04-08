import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, take, tap } from 'rxjs';
import { UserManagementService } from '../../services/userManagement/user-management.service';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [FormsModule, NgFor,CommonModule,RouterLink],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  searchTerm: string = '';
  selectedStatus: string = 'all';
  usersCount : any = 0; 

  users :any[] = [];

  ngOnInit(): void {
    this.getUsersCount();
    this.loadUsers();

  }
  private dashboardService = inject(DashboardService);
  private userService = inject(UserManagementService);
  private toastr = inject(ToastrService);


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

  deleteUser(user: any): void {
    if (user && user.userID) {
  
      // التأكد من حالة الحذف
      if (user.isDeleted) {
        this.toastr.warning('This user is already deleted.');
        return;
      }
  
      this.userService.getUserById(user.userID).subscribe({
        next: (fetchedUser) => {
          if (fetchedUser.isDeleted) {
            this.toastr.warning('This user is already deleted.');
            return;
          }
  
          // إذا لم يكن المستخدم محذوفًا بالفعل، نقوم بحذفه
          this.userService.deleteUserById(user.userID).subscribe({
            next: () => {
              this.users = this.users.filter(u => u.userID !== user.userID);
              this.toastr.success(`User ${user.name} has been deleted.`);
            },
            error: (err) => {
              this.toastr.error('Error deleting user. Please try again.');
            }
          });
        },
        error: (err) => {
          this.toastr.error('Error fetching user data before delete.');
        }
      });
    } else {
      this.toastr.error('User ID is missing.');
    }
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
        .subscribe((count) => {
          console.log(count);
          
          this.usersCount = count
        });
    }

    loadUsers(): void {
      this.userService.getAllUsers()
        .pipe(
          take(1),
          catchError((err) => {
            console.error('Error loading users:', err);
            return of([]);
          })
        )
        .subscribe((data) => {
          this.users = data.map((user: any) => {
            let status = 'active';
            if (user.isDeleted) {
              status = 'deleted';
            } else if (user.isBanned) {
              status = 'blocked';
            } else if (!user.isEmailConfirmed) {
              status = 'pending';
            }
    
            return {
              ...user,
              status,
            };
          });
        });
    }
    
}
