import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home-cara',
  imports: [NgFor],
  templateUrl: './home-cara.component.html',
  styleUrls: ['./home-cara.component.scss']
})
export class HomeCaraComponent implements OnInit, OnDestroy {
  @ViewChild('slider', { static: false }) slider!: ElementRef;

  activeIndex = 1;
  private autoSlideInterval: any;
  private isPaused = false;

  tours = [
    { title: "Adventure", count: 28, icon: "bi bi-tree", description: "Thrilling activities and exciting experiences." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Genetic", count: 12, icon: "bi bi-bank", description: "Ancient history where tranquility prevails." },
    { title: "Wildlife", count: 42, icon: "bi bi-bug", description: "Observe animals in their natural habitats." },
    { title: "Camping", count: 48, icon: "bi bi-globe-americas", description: "Enjoy outdoor living with tents and campfires." },
    { title: "Mountains", count: 22, icon: "bi bi-signpost", description: "Explore the beauty of high-altitude landscapes." },
    { title: "Beach", count: 35, icon: "bi bi-water", description: "Relax on sunny shores with clear blue water." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
  ];

  ngOnInit(): void {
    this.startAutoSlide();
  }

  ngOnDestroy(): void {
    this.stopAutoSlide();
  }

  startAutoSlide(): void {
    this.autoSlideInterval = setInterval(() => {
      if (!this.isPaused) {
        this.moveSlide(1);
      }
    }, 1000); // 1 second interval
  }

  stopAutoSlide(): void {
    if (this.autoSlideInterval) {
      clearInterval(this.autoSlideInterval);
    }
  }

  moveSlide(step: number): void {
    const maxIndex = this.tours.length - 1;
    this.activeIndex = Math.max(0, Math.min(this.activeIndex + step, maxIndex));

    // Pause auto-scroll on user interaction
    this.isPaused = true;
    setTimeout(() => {
      this.isPaused = false; // Resume auto-scroll after 3 seconds (reduced from 5s for faster resumption)
    }, 1000);

    // Remove the 100ms delay to make the movement feel more immediate
    if (this.slider) {
      const sliderElement = this.slider.nativeElement;
      const activeCard = sliderElement.children[this.activeIndex] as HTMLElement;

      if (activeCard) {
        sliderElement.scrollTo({
          left: activeCard.offsetLeft - sliderElement.offsetWidth / 2 + activeCard.offsetWidth / 2,
          behavior: 'smooth'
        });
      }
    }
  }
}