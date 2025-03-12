import { RouterModule } from '@angular/router';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, OnInit } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core'; // إضافة هذا السطر
import { CommonModule, NgFor } from '@angular/common';
import { TourssComponent } from './tourss/tourss.component';
import { FeaturedComponent } from './featured/featured.component';
import { WhySabaComponent } from './why-saba/why-saba.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { BlogComponent } from './blog/blog.component';

@Component({
    selector: 'app-home',
    standalone:true,

    imports: [
        RouterModule,
        ReactiveFormsModule,
        CommonModule,
        BlogComponent,
        TourssComponent,
        FeaturedComponent,
        WhySabaComponent,
        TestimonialsComponent,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule, // تأكد من إضافة هذا
    ],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class HomeComponent{




  dateControl = new FormControl();

  openDatepicker(datepicker: any) {
    datepicker.open();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`📍 موقعك الحالي:\nLatitude: ${latitude}\nLongitude: ${longitude}`);
        },
        (error) => {
          alert("⚠️ لم يتم منح الإذن للوصول إلى الموقع.");
        }
      );
    } else {
      alert("❌ المتصفح لا يدعم ميزة تحديد الموقع الجغرافي.");
    }
  }

  reviews = [
    { author: "DANIEL K., AUSTRALIA", text: "I was looking for a reliable tour company, and SabaTours delivered." },
    { author: "EMILY R., USA", text: "SabaTours made our trip to Egypt unforgettable!" },
    { author: "JAMES L., UK", text: "Our guide was friendly and insightful. We learned so much." },
    { author: "DANIEL K., AUSTRALIA", text: "I was looking for a reliable tour company, and SabaTours delivered." },
    { author: "EMILY R., USA", text: "SabaTours made our trip to Egypt unforgettable!" },
    { author: "JAMES L., UK", text: "Our guide was friendly and insightful. We learned so much." }
  ];


}
