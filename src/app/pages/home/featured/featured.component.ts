import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // استيراد HttpClient
import { NgClass, NgFor, NgIf } from '@angular/common';
import { environment } from '../../../../environment/environment';

@Component({
  selector: 'app-featured',
  standalone: true,
  imports: [NgFor, NgClass,NgIf],
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})
export class FeaturedComponent {
  private readonly baseUrl = environment.apiUrl;

  showAll: boolean = false; // متغير لتتبع حالة عرض الكل
  activeCategory: string = 'all'; // الفئة النشطة افتراضياً
  filteredTours: any[] = []; // مصفوفة الفلاتر للرحلات
  tours: any[] = []; // مصفوفة الرحلات التي سيتم تحميلها من الـ API
  categories: string[] = []; // مصفوفة الفئات الديناميكية
  noDataMessage: string = ''; // رسالة عدم وجود بيانات

  constructor(private http: HttpClient) {
    this.loadTours(); // تحميل الرحلات من الـ API عند تحميل الـ component
  }

  loadTours() {
    // هنا يمكنك استبدال URL بالـ API الخاص بك
    this.http.get<any[]>(`${this.baseUrl}/Tour/featured-cards`)  // URL الـ API
      .subscribe(data => {
        this.tours = data;  // تخزين البيانات المحملة في مصفوفة tours
        this.categories = Array.from(new Set(data.map(tour => tour.category))); // استخراج الفئات الديناميكية
        this.categories.push('Day Trips'); // إضافة فئة Day Trips بشكل ثابت
        this.filterTours(this.activeCategory);  // تطبيق الفلتر بناءً على الفئة الحالية
      });
  }

  getTypeName(type: string): string {
    switch (type) {
      case 'Guide Tours': return 'Guide';
      case 'Classical Tours': return 'Classical';
      case 'day': return 'Day Trip';
      default: return type;
    }
  }

  filterTours(category: string = 'all') {
    this.activeCategory = category;
    this.showAll = false;
    this.noDataMessage = ''; // إعادة تعيين رسالة عدم وجود بيانات

    if (category === 'all') {
      this.filteredTours = [...this.tours];
      this.showAll = true;
    } else {
      this.filteredTours = this.tours.filter(tour => {
        return tour.category === category; // الفلترة بناءً على category
      });

      // إذا لم توجد بيانات للفئة المختارة، نعرض رسالة عدم وجود بيانات
      if (this.filteredTours.length === 0) {
        this.noDataMessage = `No tours found for ${category}.`;
      }
    }
  }

  showAllTours() {
    this.filterTours('all');
  }
}
