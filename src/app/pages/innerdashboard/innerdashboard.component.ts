import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgxChartsModule } from '@swimlane/ngx-charts';

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
export class InnerdashboardComponent {

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

  constructor() {
  }

}
