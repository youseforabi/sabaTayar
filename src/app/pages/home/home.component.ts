import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener, OnInit } from '@angular/core';
import { faCalendarAlt, faMapMarkerAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatNativeDateModule } from '@angular/material/core'; // إضافة هذا السطر
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
    NgFor,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,  // تأكد من إضافة هذا
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent implements OnInit{

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

  testimonials = [
    { name: 'Daniel K.', country: 'Australia', title: 'Highly Recommended!', message: 'Great experience!' },
    { name: 'Emily R.', country: 'USA', title: 'Amazing Experience!', message: 'The best tour company.' },
    { name: 'James L.', country: 'UK', title: 'A Perfect Day!', message: 'Highly recommended!' },
    { name: 'Sophia M.', country: 'Canada', title: 'Loved it!', message: 'Fantastic guides and service.' },
    { name: 'Carlos D.', country: 'Spain', title: 'Worth it!', message: 'I would book again.' },
    { name: 'Liam P.', country: 'Germany', title: 'Top-notch!', message: 'Everything was well organized.' }
  ];

  visibleTestimonials: any[] = [];
  currentIndex = 0;
  testimonialsPerPage = 3;
  currentPage = 0;
  paginationArray: any[] = [];


  ngOnInit(): void {
    this.updateVisibleTestimonials();
    this.paginationArray = new Array(Math.ceil(this.testimonials.length / this.testimonialsPerPage));
  }

  updateVisibleTestimonials() {
    this.visibleTestimonials = this.testimonials.slice(this.currentIndex, this.currentIndex + this.testimonialsPerPage);
  }

  nextTestimonial() {
    if (this.currentIndex + this.testimonialsPerPage < this.testimonials.length) {
      this.currentIndex += this.testimonialsPerPage;
    } else {
      this.currentIndex = 0; // إعادة التكرار
    }
    this.currentPage = Math.floor(this.currentIndex / this.testimonialsPerPage);
    this.updateVisibleTestimonials();
  }

  prevTestimonial() {
    if (this.currentIndex - this.testimonialsPerPage >= 0) {
      this.currentIndex -= this.testimonialsPerPage;
    } else {
      this.currentIndex = this.testimonials.length - this.testimonialsPerPage; // العودة للنهاية
    }
    this.currentPage = Math.floor(this.currentIndex / this.testimonialsPerPage);
    this.updateVisibleTestimonials();
  }

  goToPage(index: number) {
    this.currentPage = index;
    this.currentIndex = index * this.testimonialsPerPage;
    this.updateVisibleTestimonials();
  }



  tours = [
    { title: 'Guide Of Egypt Tours', image: 'assets/PIC1.webp' },
    { title: 'Classic Tours', image: 'assets/pic2.webp' },
    { title: 'Day Trips', image: 'assets/pic3.webp' }
  ];

  featuredToursNow = [
    { id: 1, title: "Ramses II Temple ‘Ramesseum’, Luxor Day Trip", location: "75 PRINCE ST, NEW YORK, NY 10012, USA", price: "$50.00", image: "assets/3.jpg", rating: "0.0", comments: "0 comments" },
    { id: 2, title: "Lost Technologies of Ancient Egypt Tour III", location: "CAIRO, GIZA, LUXOR, ASWAN", rating: "0.0", comments: "0 comments", price: "$45.00", image: "assets/Untitled-1885.webp" }
  ];

  featuresWhy = [
    { icon: 'fa-star', title: 'Experience and Trust', description: 'With more than 20 years of experience in the tourism sector, authorized to organize tourist trips with all the insurance coverage that the law requires.' },
    { icon: 'fa-certificate', title: 'Quality and Commitment', description: 'High quality staff for full customer satisfaction. Reliability and commitment with respect to days and appointments from stay to departure.' },
    { icon: 'fa-headphones', title: 'Support 24 Hours', description: '24-hour assistance and resolution of any problem or need in every country in all programs based on our experience.' },
    { icon: 'fa-car', title: 'Comfortable and Modern Transport', description: 'The agency has 9 new buses for a convenient service for our customers.' }
  ];

  stats = [
    { icon: 'fa-users', value: 1254, label: 'New Visitors Every Week' },
    { icon: 'fa-smile', value: 12168, label: 'Happy customers every year' },
    { icon: 'fa-map', value: 172, label: 'Tours Published' },
    { icon: 'fa-signpost', value: 739, label: 'New Tours Every Month' }
  ];

  faMapMarker = faMapMarkerAlt;
  faCalendar = faCalendarAlt;
  faUser = faUser;
  faSearch = faSearch;

  dateControl = new FormControl();

  openDatepicker(datepicker: any) {
    datepicker.open();
  }

  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`📍 موقعك الحالي:\nLatitude: ${latitude}\nLongitude: ${longitude}`);
        },
        (error) => {
          alert("⚠️ لم يتم منح الإذن للوصول إلى الموقع.");
        }
      );
    } else {
      alert("❌ المتصفح لا يدعم ميزة تحديد الموقع الجغرافي.");
    }
  }

  reviews = [
    { author: "DANIEL K., AUSTRALIA", text: "I was looking for a reliable tour company, and SabaTours delivered." },
    { author: "EMILY R., USA", text: "SabaTours made our trip to Egypt unforgettable!" },
    { author: "JAMES L., UK", text: "Our guide was friendly and insightful. We learned so much." },
    { author: "DANIEL K., AUSTRALIA", text: "I was looking for a reliable tour company, and SabaTours delivered." },
    { author: "EMILY R., USA", text: "SabaTours made our trip to Egypt unforgettable!" },
    { author: "JAMES L., UK", text: "Our guide was friendly and insightful. We learned so much." }
  ];

  cardsPerView = 3;

  constructor() {
    this.updateCardsPerView();
  }

  @HostListener('window:resize', [])
  onResize() {
    this.updateCardsPerView();
  }

  updateCardsPerView() {
    if (window.innerWidth <= 768) {
      this.cardsPerView = 1; // Single card on mobile view
    } else if (window.innerWidth <= 1024) {
      this.cardsPerView = 2; // Two cards on tablet view
    } else {
      this.cardsPerView = 3; // Three cards on larger screens
    }
  }

}
