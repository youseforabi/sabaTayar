import { NgClass, NgFor, NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';


interface Book {
  username: string;
  userImage: string;

  phone: string;
  email: string;
  status: string;
  tourName: string;
  guests: string;
  duration: string;
  tourStart: string;
  bookingDate: string;
  tourType: string;
  price: string;
  imageUrl: string;
}
@Component({
    selector: 'app-my-booking',
    standalone:true,

    imports: [NgStyle,NgFor,NgClass,RouterModule],
    templateUrl: './my-booking.component.html',
    styleUrl: './my-booking.component.scss'
})
export class MyBookingComponent implements OnInit{
  filters: string[] = ['Paid', 'Canceled', 'Deleted'];

  booking: Book[] = [
    {
      username: 'Username',
      userImage:'assets/bookedProfile.jpg',
      phone: '01234567890',
      email: 'username@email.com',
      status: 'Paid',
      tourName: 'Ramses Temple Day Trip',
      guests: '2 Adults - 1 Children',
      duration: '1 Day',
      tourStart: 'From 10-10-2025 To 11-10-2025',
      bookingDate: '1-1-2025',
      tourType: 'Daily Tours',
      price: '$1,500',
      imageUrl: 'assets/PIC1.webp'
    },
    {
      username: 'Username',
      userImage:'assets/bookedProfile.jpg',
      phone: '01234567890',
      email: 'username@email.com',
      status: 'Deleted',
      tourName: 'Ramses Temple Day Trip',
      guests: '2 Adults - 1 Children',
      duration: '1 Day',
      tourStart: 'From 10-10-2025 To 11-10-2025',
      bookingDate: '1-1-2025',
      tourType: 'Daily Tours',
      price: '$1,500',
      imageUrl: 'assets/PIC1.webp'
    }
,
    {
      username: 'Username',
      userImage:'assets/bookedProfile.jpg',
      phone: '01234567890',
      email: 'username@email.com',
      status: 'Canceled',
      tourName: 'Ramses Temple Day Trip',
      guests: '2 Adults - 1 Children',
      duration: '1 Day',
      tourStart: 'From 10-10-2025 To 11-10-2025',
      bookingDate: '1-1-2025',
      tourType: 'Daily Tours',
      price: '$1,500',
      imageUrl: 'assets/PIC1.webp'
    }, {
      username: 'Username',
      userImage:'assets/bookedProfile.jpg',
      phone: '01234567890',
      email: 'username@email.com',
      status: 'Canceled',
      tourName: 'Ramses Temple Day Trip',
      guests: '2 Adults - 1 Children',
      duration: '1 Day',
      tourStart: 'From 10-10-2025 To 11-10-2025',
      bookingDate: '1-1-2025',
      tourType: 'Daily Tours',
      price: '$1,500',
      imageUrl: 'assets/PIC1.webp'
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.filter('Paid'); 

  }

  filteredBooking = this.booking;
  filter(type: string) {
    this.filteredBooking = this.booking.filter(book => book.status === type);
  }
  acceptTour(tour: Book) {
  }

  cancelTour(tour: Book) {
  }

  deleteTour(tour: Book) {
  }

  getCount(status: string): number {
    return this.booking.filter(book => book.status === status).length;
  }
}
