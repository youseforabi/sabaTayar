import { NgFor } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home-cara',
  imports: [NgFor],
  templateUrl: './home-cara.component.html',
  styleUrl: './home-cara.component.scss'
})
export class HomeCaraComponent {

  @ViewChild('slider', { static: false }) slider!: ElementRef;

  activeIndex = 1;

  tours = [
    { title: "Adventure", count: 28, icon: "bi bi-tree", description: "Thrilling activities and exciting experiences." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Genetic", count: 12, icon: "bi bi-bank", description: "Ancient history where tranquility prevails." },
    { title: "Wildlife", count: 42, icon: "bi bi-bug", description: "Observe animals in their natural habitats." },
    { title: "Camping", count: 48, icon: "bi bi-tent", description: "Enjoy outdoor living with tents and campfires." },
    { title: "Mountains", count: 22, icon: "bi bi-signpost", description: "Explore the beauty of high-altitude landscapes." },
    { title: "Beach", count: 35, icon: "bi bi-water", description: "Relax on sunny shores with clear blue water." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },
    { title: "Discovery", count: 32, icon: "bi bi-globe-americas", description: "Explore new places and uncover hidden gems." },

  ];

  moveSlide(step: number) {
    const maxIndex = this.tours.length - 1;
    this.activeIndex = Math.max(0, Math.min(this.activeIndex + step, maxIndex));

    setTimeout(() => {
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
    }, 100);
  }
  

}
