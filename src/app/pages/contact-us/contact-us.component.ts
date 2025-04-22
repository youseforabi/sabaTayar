import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // استيراد HttpClient
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent {
  email :string = 'info@sabatours.com'
  contactForm: FormGroup;
  apiUrl = 'https://sabatoursapi.runasp.net/api/ContactMessages'; // رابط الـ API

  constructor(private fb: FormBuilder, private http: HttpClient , private toastr : ToastrService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      source: ['', Validators.required], // يتم إرساله كـ howDidYouFindUs
      message: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.contactForm.valid) {
      // إعداد البيانات للإرسال (تعديل اسم الحقل source إلى howDidYouFindUs)
      const formData = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        country: this.contactForm.value.country,
        howDidYouFindUs: this.contactForm.value.source, // تحويل source إلى howDidYouFindUs
        message: this.contactForm.value.message
      };

      // إرسال البيانات إلى الـ API
      this.http.post(this.apiUrl, formData).subscribe({
        next: (response) => {
          this.toastr.success('Your message has been sent successfully!', 'Thank you');
          this.contactForm.reset();
        },
        error: (error) => {
          this.toastr.error('Failed to send your message. Please try again later.', 'Error');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
      this.toastr.warning('Please fill all required fields correctly.', 'Form Validation');
    }
  }
}