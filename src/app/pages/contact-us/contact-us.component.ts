import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {

  contactForm: FormGroup;
  // countries: string[] = ["United States", "Canada", "United Kingdom", "Egypt", "Saudi Arabia", "UAE", "Germany", "France", "Japan", "China"];
  // filteredCountries: string[] = [...this.countries];
  
  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      source: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      console.log("Form Data:", this.contactForm.value);
      // سيتم إرسال البيانات للـ Backend لاحقًا
    } else {
      this.contactForm.markAllAsTouched(); // لإظهار الأخطاء فورًا عند الضغط على الزر
    }
  }

  // filterCountries(event: any) {
  //   const searchTerm = event.target.value.toLowerCase();
  //   this.filteredCountries = this.countries.filter(country =>
  //     country.toLowerCase().includes(searchTerm)
  //   );
  // }

  // selectCountry(country: string) {
  //   this.contactForm.patchValue({ country });
  //   this.filteredCountries = [...this.countries]; // إغلاق القائمة بعد الاختيار
  // }

}
