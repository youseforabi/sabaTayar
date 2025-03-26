import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-booking',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-new-booking.component.html',
  styleUrl: './add-new-booking.component.scss',
  standalone:true,
})
export class AddNewBookingComponent {

  bookingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.bookingForm = this.fb.group({
      travelerName: ['', [Validators.required, Validators.minLength(3)]], 
      tourName: ['', Validators.required], 
      tourPrice: ['', [Validators.required, Validators.min(1)]], 
      guestCapability:['', Validators.required],
      guests: this.fb.group({
        adults: ['', [Validators.required, Validators.min(1)]], 
        children: ['', [Validators.required, Validators.min(0)]], 
        infants: ['', [Validators.required, Validators.min(0)]] 
      }),
  
      adultPrice: ['', [Validators.required, Validators.min(1)]], 
      childPrice: ['', [Validators.required, Validators.min(0)]],
      infantPrice: ['', [Validators.required, Validators.min(0)]], 
  
      bookingDate: ['', Validators.required],
  
      email: ['', [Validators.required, Validators.email]], 
  
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10,15}$') 
        ]
      ],
  
      paymentGateway: ['', Validators.required],
  
      cardDetails: this.fb.group({
        cardNumber: [
          '',
          [
            Validators.required,
            Validators.pattern('^([0-9]{4} ){3}[0-9]{4}$') 
          ]
        ],
        expiryMonth: [
          '',
          [
            Validators.required,
            Validators.pattern('^(0[1-9]|1[0-2])$')
          ]
        ],
        expiryYear: [
          '',
          [
            Validators.required,
            Validators.pattern('^20[2-9][0-9]$') 
          ]
        ],
        cvc: [
          '',
          [
            Validators.required,
            Validators.pattern('^[0-9]{3,4}$') 
          ]
        ]
      })
    });
  }
  
  formatCardNumber(event: any) {
    let input = event.target.value.replace(/\s+/g, '');
    let formattedInput = input.replace(/(\d{4})/g, '$1 ').trim(); 
    this.bookingForm.get('cardDetails.cardNumber')?.setValue(formattedInput, { emitEvent: false });
  }
  

  getCardNumberWithoutSpaces(): string {
    return this.bookingForm.get('cardDetails.cardNumber')?.value.replace(/\s+/g, '');
  }
  submitBooking() {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      return;
    }
    console.log('Booking submitted:', this.bookingForm.value);
  }
  
  
}
