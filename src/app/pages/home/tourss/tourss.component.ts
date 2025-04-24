
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
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
  destinations: any[] = [];
  @ViewChild('slider') slider!: ElementRef;
  currentIndex = 0;

  constructor(private http: HttpClient) {
    this.loadTours();
  }

  loadTours() {
    this.http.get<any[]>(`${this.baseUrl}/Tour/cities-with-tour-count`)
      .subscribe(data => {
        const shuffled = data.sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 6);
        this.destinations = selected.map(tour => ({
          name: tour.cityName,
          tours: tour.tourCount,
          image: 'assets/giza-pyramids-sphinx-evening-egypt-e1669109796704.jpg'
        }));
        setTimeout(() => this.updateSlider(), 0);
      });
  }

  setSlide(index: number) {
    if (this.currentIndex === index) return;
    const maxIndex = Math.max(0, Math.ceil(this.destinations.length / 2) - 1);
    if (index >= 0 && index <= maxIndex) {
      this.currentIndex = index;
      this.updateSlider();
    }
  }

  updateSlider() {
    if (!this.slider || !this.slider.nativeElement) return;

    const sliderElement = this.slider.nativeElement;
    const card = sliderElement.querySelector('.destination-card');
    if (!card) return;

    const cardWidth = card.offsetWidth;
    const gap = parseFloat(getComputedStyle(sliderElement).gap) || 16;
    const translateX = -this.currentIndex * (cardWidth * 2 + gap * 2);
    sliderElement.style.transform = `translateX(${translateX}px)`;
  }

  getSlides(): number[] {
    return Array(Math.ceil(this.destinations.length / 2)).fill(0).map((_, i) => i);
  }

  @HostListener('window:resize')
  onResize() {
    this.currentIndex = Math.min(this.currentIndex, Math.max(0, Math.ceil(this.destinations.length / 2) - 1));
    this.updateSlider();
  }
}