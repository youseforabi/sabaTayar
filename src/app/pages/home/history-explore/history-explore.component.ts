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
  @ViewChild('carousel') carousel!: ElementRef;
    homeService = inject(HomeService); // حقن السيرفيس
    data: any = {}; // متغير لحفظ البيانات القادمة من السيرفيس
  
    ngOnInit(): void {
      this.getHomeData();
    }
  
    getHomeData() {
      this.homeService.getHomeData().subscribe(response => {
        this.data = response; // تعيين البيانات القادمة من السيرفيس
      });
    }

}
