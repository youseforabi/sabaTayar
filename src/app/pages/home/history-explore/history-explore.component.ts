import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../../services/Home/home.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-history-explore',
  imports: [NgFor],
  templateUrl: './history-explore.component.html',
  styleUrls: ['./history-explore.component.scss'],
  standalone: true // افتراضًا أنه كومبوننت مستقل
})
export class HistoryExploreComponent implements OnInit {
  homeService = inject(HomeService);
  data: any = { items: [] }; // تهيئة items كمصفوفة فارغة
  @ViewChild('slider') slider!: ElementRef;
  currentIndex = 0;

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData() {
    this.homeService.getHomeData().subscribe({
      next: (response) => {
        this.data = response;
        // خلط العناصر بشكل عشوائي بعد تحميل البيانات
        this.shuffleItems();
        // تحديث السلايدر بعد تحميل البيانات
        setTimeout(() => this.updateSlider(), 0);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

  // دالة لخلط العناصر بشكل عشوائي
  shuffleItems() {
    this.data.items = this.data.items
      .map((item: any) => ({ item, sort: Math.random() }))
      .sort((a: any, b: any) => a.sort - b.sort)
      .map(({ item }: any) => item);
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  nextSlide() {
    const itemsToShow = this.getItemsToShow();
    const maxIndex = Math.max(0, this.data.items.length - itemsToShow);
    if (this.currentIndex < maxIndex) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  updateSlider() {
    if (!this.slider || !this.slider.nativeElement) return;

    const sliderElement = this.slider.nativeElement;
    const card = sliderElement.querySelector('.item-card');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 16; // نفس قيمة الـ gap في CSS
    const translateX = -this.currentIndex * (cardWidth + gap);
    sliderElement.style.transform = `translateX(${translateX}px)`;
  }

  // دالة لتحديد عدد الكروت المعروضة بناءً على حجم الشاشة
  getItemsToShow(): number {
    const width = window.innerWidth;
    if (width <= 480) return 1; // شاشات الموبايل
    if (width <= 768) return 2; // التابلت
    return 3; // الشاشات الكبيرة
  }

  // تحديث السلايدر عند تغيير حجم الشاشة
  @HostListener('window:resize')
  onResize() {
    this.updateSlider();
  }
}