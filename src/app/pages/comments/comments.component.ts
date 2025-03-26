import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
    selector: 'app-comments',
    standalone:true,
    imports: [NgFor],
    templateUrl: './comments.component.html',
    styleUrl: './comments.component.scss'
})
export class CommentsComponent {

  filters: string[] = ['Guide Of Egypt', 'Classical Tour', 'Day Trip' ,'Deleted Comment' ];
  selectedFilter: string = 'Guide Of Egypt';


  comments = [
    { img: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'John Doe', text: 'Amazing experience!', type : 'Guide Of Egypt' },
    { img: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Sarah Smith', text: 'Excellent service!', type : 'Classical Tours' },
    { img: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Michael Brown', text: 'Very professional!', type : 'Classical Tours' },
    { img: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'Emily Davis', text: 'Fast response!', type : 'Day Of Trips' },
    { img: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'Chris Wilson', text: 'Super happy with the experience!', type : 'Day Of Trips' },
    { img: 'https://randomuser.me/api/portraits/women/6.jpg', name: 'Olivia Taylor', text: 'Absolutely fantastic!', type : 'Guide Of Egypt' },
    { img: 'https://randomuser.me/api/portraits/women/6.jpg', name: 'Olivia Taylor', text: 'Absolutely fantastic!', type : 'Deleted Comments' },
    { img: 'https://randomuser.me/api/portraits/women/6.jpg', name: 'Olivia Taylor', text: 'Absolutely fantastic!', type : 'Deleted Comments' }
  ];

  ngOnInit(): void {
    this.filter('Guide Of Egypt'); 

  }

  filteredComment = this.comments;
  filter(type: string) {
    this.filteredComment = this.comments.filter(comment => comment.type === type);
    this.selectedFilter = type;

  }

}
