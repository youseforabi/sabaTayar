import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-tourss',
  standalone: true,
  imports: [NgFor],
  templateUrl: './tourss.component.html',
  styleUrl: './tourss.component.scss'
})
export class TourssComponent {

  private readonly baseUrl = environment.apiUrl;

  // مصفوفة لتخزين البيانات القادمة من الـ API
  destinations: any[] = [];

  


  constructor(private http: HttpClient) {
    this.loadTours(); // تحميل الرحلات من الـ API عند تحميل الـ component
  }

  loadTours() {
    this.http.get<any[]>(`${this.baseUrl}/Tour/cities-with-tour-count`) // URL الـ API
      .subscribe(data => {
        // هنا نقوم بتخزين البيانات القادمة من الـ API في مصفوفة destinations
        this.destinations = data.map(tour => ({
          name: tour.cityName,  // استخراج اسم المدينة
          tours: tour.tourCount, // استخراج عدد الجولات
          image: 'assets/giza-pyramids-sphinx-evening-egypt-e1669109796704.jpg' // هنا يمكن إضافة صورة افتراضية أو التعامل مع الصور القادمة من الـ API إذا كانت موجودة
        }));

      });
  }
}
