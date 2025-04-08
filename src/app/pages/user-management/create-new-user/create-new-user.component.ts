import { NgFor, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../services/userManagement/user-management.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-new-user',
  standalone: true,
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './create-new-user.component.html',
  styleUrl: './create-new-user.component.scss'
})
export class CreateNewUserComponent {
  userForm: FormGroup;
  profilePicture: string = 'https://www.w3schools.com/w3images/avatar2.png';

  constructor(private fb: FormBuilder,
    private userService: UserManagementService,
    private toastr: ToastrService
      
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      birthDate: ['', Validators.required],
      location: ['', Validators.required],
      isEmailConfirmed: [false],
      profilePicture: [null], // تعديل هنا ليقبل ملف
      phone: ['', Validators.required],
      role: ['', Validators.required],
    
      // غير مطلوبين للباك
      firstName: [''],
      lastName: [''],
      gender: [''],
      city: [''],
      presentAddress: [''],
      memberStatus: [false],
      sendEmail: [false],
    },{
    validator: this.passwordMatchValidator // تطبيق التحقق من تطابق كلمة المرور

  });
    
  }
  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // قراءة الصورة وتحويلها إلى Base64
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePicture = reader.result as string; // هنا الصورة ستصبح Base64
        this.userForm.patchValue({
          profilePicture: this.profilePicture // حفظ Base64 في الـ form
        });
      };
      reader.readAsDataURL(file); // تحويل الصورة إلى Base64
    }
  }
  onSubmit() {
    if (this.userForm.valid) {
      const formValue = this.userForm.value;
  
      // اختار فقط الحقول المطلوبة للباك
      const payload = {
        name: formValue.name,
        email: formValue.email,
        password: formValue.password,
        confirmPassword: formValue.confirmPassword,
        birthDate: new Date(formValue.birthDate).toISOString(),
        location: formValue.location,
        isEmailConfirmed: formValue.isEmailConfirmed,
        profilePicture: formValue.profilePicture, // هنا الصورة بالـ Base64
        phone: formValue.phone,
        role: formValue.role
      };
  
      this.userService.createUser(payload).subscribe({
        next: (response) => {
          this.toastr.success('User created successfully', 'Success!');
          this.onClose();
        },
        error: (error) => {
          this.toastr.error('Failed to create user', 'Error!');
        }
      });
    } else {
      console.log('Form is invalid!');
      // عرض إشعار في حال كان النموذج غير صالح
      this.toastr.warning('Please fill in all required fields.', 'Warning!');
    }
  
  }
  
  
  onClose() {
    this.userForm.reset();
  }
}
