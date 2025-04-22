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
    this.http.get<any[]>(`${this.baseUrl}/Tour/cities-with-tour-count`)
      .subscribe(data => {
        // خلط البيانات عشوائياً
        const shuffled = data.sort(() => 0.5 - Math.random());
  
        // أخذ أول 6 عناصر فقط بعد الخلط
        const selected = shuffled.slice(0, 6);
  
        this.destinations = selected.map(tour => ({
          name: tour.cityName,
          tours: tour.tourCount,
          image: 'assets/giza-pyramids-sphinx-evening-egypt-e1669109796704.jpg'
        }));
      });
  }
  
}
