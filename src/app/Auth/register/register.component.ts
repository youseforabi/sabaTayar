import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormsModule,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; // ✅ استيراد ReactiveFormsModule
import { AuthService } from '../../services/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  providers: [HttpClient],
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, FormsModule], // ✅ تأكد من أن ReactiveFormsModule موجود هنا
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  imagePreview!: string;
  registerForm: FormGroup;
  showOtpModal: boolean = false;
  otp: string = '';

  selectedFile: File | null = null;
  loading = false;
  errorMessage: string | null = null;
  private fb = inject(FormBuilder);

  constructor(
    private authService: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.registerForm = this.fb.group(
      {
        userID: [''],
        name: ['', Validators.required],
        birthDate: [''],
        phone: ['', Validators.required],
        location: [''],
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/
            ),
          ],
        ],
        confirmPassword: ['', Validators.required],
        profilePicture: [null],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordsMatchValidator: ValidatorFn = (
    form: AbstractControl
  ): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword
      ? null
      : { mismatch: true };
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registerForm.patchValue({ profilePicture: file });

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      this.toastr.error('Please fill in all required fields correctly', 'Error');
      return;
    }
  
    this.loading = true;
    this.errorMessage = null;
  
    const formData = new FormData();
    const userData: any = {}; // كائن لتخزين البيانات المدخلة من الفورم
  
    Object.keys(this.registerForm.controls).forEach((key) => {
      const value = this.registerForm.get(key)?.value;
      if (value) {
        formData.append(key, value);
        userData[key] = value; // تخزين البيانات في الكائن
      }
    });
  
    // إضافة log لبيانات النموذج
    console.log('Form Data:', userData);  // إضافة تسجيل بيانات المستخدم
  
    if (this.selectedFile) {
      formData.append('ProfilePicture', this.selectedFile);
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const base64Image = e.target.result;
        userData['profilePicture'] = base64Image; // تخزين الصورة في الـ localStorage كـ base64
        localStorage.setItem('userData', JSON.stringify(userData));
  
        console.log('Base64 Image:', base64Image);  // إضافة تسجيل الصورة
  
      };
      reader.readAsDataURL(this.selectedFile);
    } else {
      localStorage.setItem('userData', JSON.stringify(userData));
    }
  
    this.authService.register(formData).subscribe({
      next: (response) => {
        this.toastr.success(response.message || 'Registration successful!', 'Success');
        this.loading = false;
        this.openOtpModal();
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'Registration failed. Please try again.', 'Error');
        this.loading = false;
      },
    });
  }
  
  
  

  verifyOtp() {
    const email = this.registerForm.get('email')?.value;
    this.authService.verifyOtp(email, this.otp).subscribe({
      next: (response) => {
        this.toastr.success('Email Verified Successfully!', 'Success');
        this.closeOtpModal();
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Invalid OTP', 'Error');
      },
    });
  }
  resendOtp() {
    const email = this.registerForm.get('email')?.value;
    if (!email) {
      this.toastr.error('Email is required to resend OTP', 'Error');
      return;
    }
    this.authService.resendOtp(email).subscribe({
      next: (response) => {
        this.toastr.success('Otp Resend Successfully!', 'Success');
        this.toastr.info('Please check your email for OTP', 'Info');
      },
      error: (err) => {
        this.toastr.error('Failed to resend OTP. Please try again.', 'Error');
        console.error(err);
      },
    });
  }

  openOtpModal() {
    this.showOtpModal = true;
  }

  closeOtpModal() {
    this.showOtpModal = false;
  }
}
