import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, ReactiveFormsModule } from '@angular/forms';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../services/Auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  providers:[HttpClient],
  standalone: true,
  imports: [ReactiveFormsModule, NgIf
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  imagePreview! :string ;
  registerForm: FormGroup;
  faUser = faUser;
  faLock = faLock;
  selectedFile: File | null = null;
  loading = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
     private authService: AuthService,
     private toastr: ToastrService,
    private router : Router
     

    ) {
    this.registerForm = this.fb.group({
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
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/),
        ],
      ],
      confirmPassword: ['', Validators.required],
      profilePicture: [null],
    }, { validators: this.passwordsMatchValidator });
  }

  get f() {
    return this.registerForm.controls;
  }

  passwordsMatchValidator: ValidatorFn = (form: AbstractControl): ValidationErrors | null => {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password && confirmPassword && password === confirmPassword ? null : { mismatch: true };
  };

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.registerForm.patchValue({ profilePicture: file });
  
      // عرض الصورة المختارة كمعاينة
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
Object.keys(this.registerForm.controls).forEach(key => {
  const value = this.registerForm.get(key)?.value;
  if (value) {
    formData.append(key, value);
  }
});

if (this.selectedFile) {
  formData.append('ProfilePicture', this.selectedFile);
}


    if (this.selectedFile) {
      formData.append('ProfilePicture', this.selectedFile);
    }


    this.authService.register(formData).subscribe({
      next: (response) => {
        this.toastr.success(response.message || 'Registration successful!', 'Success');
        this.loading = false;
        this.router.navigate(['/login']);
      },
      error: (error) => {
        this.toastr.error(error.error.message || 'Registration failed. Please try again.', 'Error');
        this.loading = false;
      }
    });

}

}