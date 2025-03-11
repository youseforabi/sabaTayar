import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/Auth/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
     private authService: AuthService,
     private toastr: ToastrService,
     private router : Router

    ) {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
        ],
      ],
    });
  }



  get f() {
    return this.loginForm.controls;
  }
  onSubmit() {
    if (this.loginForm.valid) {
      const Email = this.loginForm.value.Email.trim();
      const Password = this.loginForm.value.Password.trim();
  
      console.log('📤 Sending Data:', { Email, Password });
  
      this.authService.login(Email, Password).subscribe({
        next: (res) => {
          this.toastr.success('Login successful!', 'Success');
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.toastr.error('Invalid email or password. Please try again.', 'Error');
        }
      });
    }
  }
  
  
  
  
}
