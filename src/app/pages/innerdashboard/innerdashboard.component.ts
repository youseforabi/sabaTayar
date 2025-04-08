import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DashboardService } from '../../services/dashboard.service';
import { catchError, of, take, tap } from 'rxjs';

@Component({
    selector: 'app-innerdashboard',
    standalone:true,

    imports: [
        CommonModule,
        RouterModule,
        
        NgxChartsModule
    ],
    templateUrl: './innerdashboard.component.html',
    styleUrl: './innerdashboard.component.scss'
})
export class InnerdashboardComponent implements OnInit {
  bookingsCount: number = 0; 
  toursCount: number = 0; 


  chartData = [
    {
      name: "Category 1",
      series: [
        { name: "Jan", value: 50 },
        { name: "Feb", value: 80 }
      ]
    },
    {
      name: "Category 2",
      series: [
        { name: "Jan", value: 70 },
        { name: "Feb", value: 40 }
      ]
    }
  ];

  recentActivities = [
    'User John booked a tour.',
    'New review added for Paris Tour.',
    'Booking canceled by Sarah.'
  ];

  history = [
    'Logged in from new device.',
    'Password changed successfully.',
    'Subscription renewed.'
  ];

  

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    // this.getBookingsCount(); 
    // this.getToursCount()
  }

  // getBookingsCount(): void {
  //   this.dashboardService.getBookingsCount()
  //     .pipe(
  //       take(1), // ينهي الاشتراك بعد استدعاء واحد
  //       tap( ), // تسجيل القيمة في الكونسول
  //       catchError((err) => {
  //         console.error('Error fetching bookings count:', err);
  //         return of(0); // إرجاع قيمة افتراضية لتجنب الأخطاء في الواجهة
  //       })
  //     )
  //     .subscribe((count) => this.bookingsCount = count);
  // }

  // getToursCount():void {
  //   this.dashboardService.getToursCount()
  //   .pipe(
  //     take(1),
  //     tap(),
  //     catchError((err) => {
  //       console.error('Error fetching tours count:', err);

  //         return of(0); // إرجاع قيمة افتراضية لتجنب الأخطاء في الواجهة
  //     })
  //   )
  //   .subscribe((count) => this.toursCount = count);
  // }
  

}
