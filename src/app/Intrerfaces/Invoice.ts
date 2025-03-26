export interface User {
    userID: string;
    name: string;
    email: string;
    phone: string;
    location: string;
  }
  
  export interface TourBooking {
    tourID: string;
    tourName: string;
    bookingDate: string;
    price: number;
  }
  
  export interface Invoice {
    invoiceID: string;
    userID: string;
    user: User;
    bookingID: string;
    tourBooking: TourBooking;
    invoiceDate: string;
    totalAmount: number;
    status: string;
  }
  