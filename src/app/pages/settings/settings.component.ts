import { CommonModule, NgFor, NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { SettingService } from '../../services/setting/setting.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgFor,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    MatFormFieldModule,
    MatSelectModule,
    MatSlideToggleModule,
    MatButtonModule
  ],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss'
})
export class SettingsComponent {
  
  editProfileForm!: FormGroup;
  activeTab: string = localStorage.getItem('activeTab') || 'Edit Profile';

  user = {
    profileImage: localStorage.getItem('profileImage')
  };
  selectedImage: string | null = null; // تخزين الصورة مؤقتًا عند التغيير

  currencies: string[] = ['USD', 'EUR', 'GBP', 'JPY', 'SAR', 'AED']; 
timeZones: string[] = [
  '(GMT-12:00) International Date Line West',
  '(GMT-11:00) Midway Island, Samoa',
  '(GMT-10:00) Hawaii',
  '(GMT-09:00) Alaska',
  '(GMT-08:00) Pacific Time (US & Canada)',
  '(GMT-07:00) Mountain Time (US & Canada)',
  '(GMT-06:00) Central Time (US & Canada)',
  '(GMT-05:00) Eastern Time (US & Canada)'
]; 


  formFields = [
    { key: 'name', label: 'Your Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'email' },
    { key: 'dateOfBirth', label: 'Date Of Birth', type: 'date' },
    { key: 'location', label: 'location', type: 'text' },
    { key: 'country', label: 'Country', type: 'text' }
  ];

  preferencesForm!: FormGroup;

  securityForm: FormGroup;

  sendReceiveCurrency!:boolean;
notificationOptions = [
  { key: 'sendReceiveCurrency', label: 'I send or receive digital currency' },
  { key: 'merchantOrder', label: 'I receive merchant order' },
  { key: 'accountRecommendation', label: 'There are recommendations for my account' }
];




  constructor(private fb: FormBuilder , private settingService : SettingService) {

    this.activeTab = this.settingService.getActiveTab();
    this.user.profileImage = this.settingService.getProfileImage();
    this.user.profileImage = localStorage.getItem('profileImage') || this.settingService.getProfileImage();


    this.editProfileForm = this.fb.group({
      profileImage: [this.user.profileImage],

      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dateOfBirth: ['', Validators.required],
      location: ['', Validators.required],
      country: ['', Validators.required],

 
    });

    this.preferencesForm = this.fb.group({
      currency: ['USD', Validators.required],
      timeZone: ['(GMT-12:00) International Date Line West', Validators.required],
      sendReceiveCurrency: [true],
      merchantOrder: [false],
      accountRecommendation: [true]
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', [Validators.required, Validators.minLength(6)]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  changeTab(tab: string) {
  this.activeTab = tab;
  this.settingService.setActiveTab(tab);
}

editProfileSetting() {
  if (this.editProfileForm.valid) {
    console.log('Form Data:', this.editProfileForm.value);

    // تحديث الصورة في الخدمة و localStorage
    if (this.selectedImage) {
      this.user.profileImage = this.selectedImage; 
      this.settingService.setProfileImage(this.selectedImage); 
      localStorage.setItem('profileImage', this.selectedImage);
    }
  } else {
    console.log('Form is invalid');
  }
}


onProfileImageChange(event: Event) {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.selectedImage = e.target.result; 
      this.editProfileForm.patchValue({ profileImage: this.selectedImage });

      console.log(this.editProfileForm.value);
    };

    reader.readAsDataURL(file);
  }
}

savePreferences() {
  if (this.preferencesForm.valid) {
    console.log('Preferences Saved:', this.preferencesForm.value);
  } else {
    console.log('Preferences form is invalid');
  }


}


saveSecuritySettings() {
  if (this.securityForm.valid) {
    console.log(this.securityForm.value);
    alert('Settings saved successfully!');
  } else {
    alert('Please fill out all required fields correctly.');
  }
}
}
