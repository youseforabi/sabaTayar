import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CUSTOM_ELEMENTS_SCHEMA, Component, HostListener } from '@angular/core';
import { faCalendarAlt, faMapMarkerAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { MatNativeDateModule } from '@angular/material/core'; // إضافة هذا السطر

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,  // تأكد من إضافة هذا
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomeComponent {

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
