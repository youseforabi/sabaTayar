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
  commentCounts: number = 0;
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


  recentActivities: any[] = []; // إضافة متغير لتخزين الأنشطة


  history = [
    'Logged in from new device.',
    'Password changed successfully.',
    'Subscription renewed.'
  ];

  

  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.getAllDashCounts(); // استدعاء الدالة للحصول على البيانات
    this.getRecentActivities(); // استدعاء الدالة لجلب الأنشطة


  }

  getAllDashCounts(): void {
    this.dashboardService.getAllDashCount()
      .pipe(
        take(1), // ينهي الاشتراك بعد استدعاء واحد
        tap(response => {
          console.log(response); // تسجيل الاستجابة في الكونسول
        }),
        catchError((err) => {
          console.error('Error fetching dashboard counts:', err);
          return of({ tourCount: 0, bookingCount: 0, commentCount: 0 }); // إرجاع قيمة افتراضية لتجنب الأخطاء
        })
      )
      .subscribe((response) => {
        this.toursCount = response.tourCount; // تعيين قيمة tourCount
        this.bookingsCount = response.bookingCount; // تعيين قيمة bookingCount
        this.commentCounts = response.commentCount; // تعيين قيمة commentCount
      });
  }

  getRecentActivities(): void {
    this.dashboardService.getRecentActivities()
      .pipe(
        take(1),
        tap(response => {
          console.log(response); // تسجيل الأنشطة المستلمة في الكونسول
        }),
        catchError((err) => {
          console.error('Error fetching recent activities:', err);
          return of([]); // إرجاع مصفوفة فارغة في حالة الخطأ
        })
      )
      .subscribe((activities) => {
        // ترتيب الأنشطة حسب التاريخ من الأحدث للأقدم
        this.recentActivities = activities.sort((a, b) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        }).slice(0, 4); // عرض أول 4 أنشطة فقط
      });
  }

  
  

}
