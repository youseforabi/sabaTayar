import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../../services/Home/home.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-history-explore',
  imports: [NgFor],
  templateUrl: './history-explore.component.html',
  styleUrl: './history-explore.component.scss'
})
export class HistoryExploreComponent implements OnInit  {
    homeService = inject(HomeService); // حقن السيرفيس
    data: any = {}; // متغير لحفظ البيانات القادمة من السيرفيس
  
    ngOnInit(): void {
      this.getHomeData();
    }
    @ViewChild('slider', { static: false }) slider!: ElementRef;
    currentIndex = 0;
  
    prevSlide() {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.updateSlider();
      }
    }
  
    nextSlide() {
      const maxIndex = Math.max(0, document.querySelectorAll('.item-card').length - 3);
      if (this.currentIndex < maxIndex) {
        this.currentIndex++;
        this.updateSlider();
      }
    }
  
    updateSlider() {
      const translateX = -this.currentIndex * 310; // عرض الكارت + المسافة بينهما
      this.slider.nativeElement.style.transform = `translateX(${translateX}px)`;
    }
    getHomeData() {
      this.homeService.getHomeData().subscribe(response => {
        this.data = response; // تعيين البيانات القادمة من السيرفيس
      });
    }

}
