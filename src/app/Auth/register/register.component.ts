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
        userID: [''],  // This will be auto-generated in onSubmit
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

// In register.component.ts
onSubmit() {
  if (this.registerForm.invalid) {
    this.toastr.error('Please fill in all required fields correctly', 'Error');
    return;
  }

  this.loading = true;
  this.errorMessage = null;

  // Generate a valid UUID for userID if empty
  const userID = this.registerForm.get('userID')?.value || this.generateUUID();

  // Format birthDate properly
  const birthDateValue = this.registerForm.get('birthDate')?.value;
  let formattedBirthDate = null;

  if (birthDateValue) {
    // If it's a Date object
    if (birthDateValue instanceof Date) {
      formattedBirthDate = birthDateValue.toISOString().split('T')[0];
    } 
    // If it's already a string
    else if (typeof birthDateValue === 'string' && birthDateValue.trim() !== '') {
      formattedBirthDate = new Date(birthDateValue).toISOString().split('T')[0];
    }
  }

  // Create registration data object
  const registrationData = {
    userID: userID,
    name: this.registerForm.get('name')?.value || '',
    birthDate: formattedBirthDate,
    phone: this.registerForm.get('phone')?.value || '',
    location: this.registerForm.get('location')?.value || '',
    email: this.registerForm.get('email')?.value || '',
    password: this.registerForm.get('password')?.value || '',
    confirmPassword: this.registerForm.get('confirmPassword')?.value || '',
    profilePicture: '',
    model: {} // Add the required model field
  };

  // Log the data to be sent
  console.log('Registration data to be sent:', registrationData);

  const processRegistration = () => {
    // Save non-sensitive user data locally 
    const localUserData = {
      name: registrationData.name,
      email: registrationData.email,
      phone: registrationData.phone,
      location: registrationData.location
    };
    localStorage.setItem('userData', JSON.stringify(localUserData));

    // Send registration request
    this.authService.register(registrationData).subscribe({
      next: (response) => {
        this.toastr.success(response.message || 'Registration successful!', 'Success');
        this.loading = false;
        this.openOtpModal();
      },
      error: (error) => {
        console.error('Registration error:', error);
        // Detailed error logging
        if (error.error && error.error.errors) {
          console.log('Validation errors:', error.error.errors);
        }
        this.toastr.error(error.error?.message || 'Registration failed. Please try again.', 'Error');
        this.loading = false;
      },
    });
  };

  // Handle image if selected
  if (this.selectedFile) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      registrationData.profilePicture = e.target.result.split(',')[1]; // Remove "data:image/..." prefix
      processRegistration();
    };
    reader.readAsDataURL(this.selectedFile);
  } else {
    processRegistration();
  }
}

// Helper method to generate a UUID
generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, 
          v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
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
