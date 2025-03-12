import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-blog',
  standalone:true,
  imports: [NgFor],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss'
})
export class BlogComponent {

  
    blogPosts = [
      {
        title: 'King Sneferu – The Founder of The 4th Dynasty',
        image: 'assets/King-Sneferu-thum.jpg',
        text: 'King Sneferu King Sneferu is the founder of the 4th dynasty, Sneferu is the successor of king Huni the last king of the 3rd dynasty, but there is no evidences say that he was a son of Huni, most likely he was his son in low,',
        date: 'February 22, 2025',
        views: 114,
        category: 'Adventure',
      },
      {
        title: 'Mummification',
        image: 'assets/myBooking.jpg',
        text: 'Mummification The Ancient Egyptians believed in the 2nd life, they believed that death is a middle stage between the first life which was considered short...',
        date: 'June 7, 2019',
        views: 3243,
        category: 'Adventure',
      },
      {
        title: 'Integer sagittis',
        image: 'assets/integerjpg.jpg',
        text: 'Ut euismod ultricies sollicitudin. Curabitur sed dapibus nulla. Nulla eget iaculis lectus. Mauris ac maximus neque. Nam in mauris quis libero sodales eleifend. Morbi varius, nulla sit amet rutrum elementum, est elit finibus tellus, ut',
        date: 'May 25, 2019',
        views: 2554,
        category: 'Interviews',
      }
    ]
  
  
  
  

}
