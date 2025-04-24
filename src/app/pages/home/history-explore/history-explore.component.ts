
import { Component, ElementRef, HostListener, inject, OnInit, ViewChild } from '@angular/core';
import { HomeService } from '../../../services/Home/home.service';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-history-explore',
  imports: [NgFor],
  templateUrl: './history-explore.component.html',
  styleUrls: ['./history-explore.component.scss'],
  standalone: true
})
export class HistoryExploreComponent implements OnInit {
  homeService = inject(HomeService);
  data: any = { items: [] };
  @ViewChild('slider') slider!: ElementRef;
  currentIndex = 0;

  ngOnInit(): void {
    this.getHomeData();
  }

  getHomeData() {
    this.homeService.getHomeData().subscribe({
      next: (response) => {
        this.data = response;
        this.shuffleItems();
        setTimeout(() => this.updateSlider(), 0);
      },
      error: (err) => {
        console.error('Error fetching data:', err);
      }
    });
  }

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

  setSlide(index: number) {
    if (this.currentIndex === index) return;
    const itemsToShow = this.getItemsToShow();
    const maxIndex = Math.max(0, this.data.items.length - itemsToShow);
    if (index >= 0 && index <= maxIndex) {
      this.currentIndex = index;
      this.updateSlider();
    }
  }

  updateSlider() {
    if (!this.slider || !this.slider.nativeElement) return;

    const sliderElement = this.slider.nativeElement;
    const card = sliderElement.querySelector('.item-card');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = 16;
    const translateX = -this.currentIndex * (cardWidth + gap);
    sliderElement.style.transform = `translateX(${translateX}px)`;
  }

  getItemsToShow(): number {
    const width = window.innerWidth;
    if (width <= 480) return 1;
    if (width <= 768) return 2;
    return 3;
  }

  @HostListener('window:resize')
  onResize() {
    this.currentIndex = Math.min(this.currentIndex, Math.max(0, this.data.items.length - this.getItemsToShow()));
    this.updateSlider();
  }
}