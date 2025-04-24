import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy, HostListener, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home-cara',
  imports: [NgFor],
  templateUrl: './home-cara.component.html',
  styleUrls: ['./home-cara.component.scss']
})
export class HomeCaraComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  activeIndex = 1;
  private autoSlideInterval: any;
  private isPaused = false;
  private isMobile = false;
  private isScrolling = false;
  private cardWidths: number[] = [];
  private resizeTimeout: any;

  tours = [
    { title: "Adventure", count: 28, icon: "bi bi-tree", description: "Thrilling activities and exciting experiences." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Genetic", count: 12, icon: "bi bi-bank", description: "Ancient history where tranquility prevails." },
    { title: "Wildlife", count: 42, icon: "bi bi-bug", description: "Observe animals in their natural habitats." },
    { title: "Camping", count: 48, icon: "bi bi-globe-americas", description: "Enjoy outdoor living with tents and campfires." },
    { title: "Mountains", count: 22, icon: "bi bi-signpost", description: "Explore the beauty of high-altitude landscapes." },
    { title: "Beach", count: 35, icon: "bi bi-water", description: "Relax on sunny shores with clear blue water." },
    { title: "Culture", count: 29, icon: "bi bi-globe-americas", description: "Immerse in local traditions and heritage." },
    { title: "Urban", count: 19, icon: "bi bi-building", description: "Discover vibrant city life and landmarks." },
    { title: "Foodie", count: 25, icon: "bi bi-cup-hot", description: "Savor culinary delights and local cuisines." },
  ];

  constructor() {
    this.checkScreenSize();
  }

  @HostListener('window:resize')
  checkScreenSize() {
    this.isMobile = window.innerWidth <= 768;
    // Debounce resize to prevent multiple scroll calls
    clearTimeout(this.resizeTimeout);
    this.resizeTimeout = setTimeout(() => {
      this.resetCardWidths();
      this.calculateCardWidths();
      this.scrollToCard();
    }, 200);
  }

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngAfterViewInit(): void {
    this.calculateCardWidths();
    setTimeout(() => this.scrollToCard(), 100);
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
    clearTimeout(this.resizeTimeout);
  }

  private calculateCardWidths(): void {
    if (!this.slider) return;

    const sliderElement = this.slider.nativeElement;
    const cards = sliderElement.children;
    this.cardWidths = [];

    for (let i = 0; i < cards.length; i++) {
      this.cardWidths[i] = cards[i].offsetWidth;
    }
  }

  private resetCardWidths(): void {
    this.cardWidths = [];
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      if (!this.isPaused && !this.isScrolling) {
        this.moveSlide(1);
      }
    }, 5000); // Increased to 5s for smoother pacing
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  setActiveIndex(index: number): void {
    if (this.activeIndex === index || this.isScrolling) return;
    
    this.activeIndex = index;
    this.scrollToCard();
    
    this.pauseAutoSlide();
  }

  moveSlide(step: number): void {
    if (this.isScrolling) return;
    
    const maxIndex = this.tours.length - 1;
    let newIndex = this.activeIndex + step;
    
    if (newIndex < 0) {
      newIndex = maxIndex;
    } else if (newIndex > maxIndex) {
      newIndex = 0;
    }
    
    this.activeIndex = newIndex;
    this.scrollToCard();
    this.pauseAutoSlide();
  }

  private scrollToCard(): void {
    if (!this.slider) return;
    
    const sliderElement = this.slider.nativeElement;
    const cards = sliderElement.children;
    
    if (!cards || !cards[this.activeIndex]) return;

    this.isScrolling = true;
    
    // Use requestAnimationFrame for smoother updates
    requestAnimationFrame(() => {
      let scrollPosition = 0;
      
      if (this.cardWidths.length === cards.length) {
        for (let i = 0; i < this.activeIndex; i++) {
          scrollPosition += this.cardWidths[i] + 15; // Width + gap
        }
        scrollPosition -= (sliderElement.offsetWidth / 2) - (this.cardWidths[this.activeIndex] / 2);
      } else {
        const activeCard = cards[this.activeIndex] as HTMLElement;
        scrollPosition = activeCard.offsetLeft - (sliderElement.offsetWidth / 2) + (activeCard.offsetWidth / 2);
      }
      
      sliderElement.scrollTo({
        left: Math.max(0, scrollPosition),
        behavior: 'smooth'
      });
      
      // Reset scrolling flag after animation
      setTimeout(() => {
        this.isScrolling = false;
      }, 600); // Match CSS scroll duration
    });
  }

  private pauseAutoSlide(): void {
    this.isPaused = true;
    setTimeout(() => {
      this.isPaused = false;
    }, 3000);
  }
}