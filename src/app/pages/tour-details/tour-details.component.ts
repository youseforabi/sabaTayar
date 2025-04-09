import { ChangeDetectorRef, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/Tours/tour.service';
import { CommonModule, DatePipe, NgIf } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

interface TourPlan {
  title: string;
  description: string;
}

interface TourFacility {
  title: string;
  description: string;
}

interface TourFact {
  title: string;
  value: string;
  description: string;
}

interface AdditionalServiceFee {
  serviceName: string;
  price: number;
  description: string;
}

interface TermCondition {
  title: string;
  description: string;
}

interface AvailableDate {
  date: string;
  price: number;
  maxGuests: number;
}

interface User {
  id: string;
  userName: string;
  profilePicture: string;
}

interface Reply {
  id: number;
  content: string;
  createdAt: string;
  user: User;
}

interface Comment {
  userName: string;
  profilePicture: string;
  content: string;
  createdAt: string;
}

interface TourDetails {
  id: number;
  tourTitle: string;
  tourCategory: string;
  tourDay: number;
  tourNight: number;
  tourPrice: number;
  adultPrice: number;
  childrenPrice: number;
  infantPrice: number;
  guestsCapabilityAdult: number;
  guestsCapabilityChildren: number;
  guestsCapabilityInfant: number;
  tourDescription: string;
  mainImage: string;
  startTour: string;
  pickUp: string;
  isFeatured: boolean;
  isVerified: boolean;
  headerImages: string[];
  galleryImages: string[];
  places: string[];
  tourTags: string[];
  tourPlans: TourPlan[];
  tourIncludes: string[];
  tourExcludes: string[];
  tourFacilities: TourFacility[];
  tourFacts: TourFact[];
  additionalServiceFees: AdditionalServiceFee[];
  termsAndConditions: TermCondition[];
  availableDates: AvailableDate[];
  comments: Comment[];
}
@Component({
  selector: 'app-tour-details',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  standalone:true,
  providers:[DatePipe],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss'
})
export class TourDetailsComponent {
  selectedBlog:any | null = null;

  tourId: number = 0;
  tourDetails: TourDetails | null = null;
  loading: boolean = true;
  error: string | null = null;
   // نموذج التعليق الجديد
   newComment = {
    content: '',
  };
  showAllComments = false;

  
  // Booking related properties
  selectedDate: string = '';
  adults: number = 1;
  children: number = 0;
  infants: number = 0;
  selectedServices: { [key: string]: boolean } = {};
  totalPrice: number = 0;
  
  // UI state
  activeImageIndex: number = 0;
  activeTab: string = 'description';
  
  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
        private cdr: ChangeDetectorRef,
            private toastr: ToastrService,
            private datePipe: DatePipe,
            private formBuilder: FormBuilder,
        
    
  ) {}
  bookingForm: FormGroup; // نموذج الحجز
  formatTime(dateStr: string): string {
    const date = new Date(dateStr);
    return this.datePipe.transform(date, 'shortTime') || '';
  }
  ngOnInit(): void {
    
    this.route.params.subscribe(params => {
      this.tourId = +params['id'];
      this.loadTourDetails();
    });
    this.bookingForm = this.formBuilder.group({
      selectedDate: new FormControl(''),  // Bind to the formControlName in the template
      selectedTime: new FormControl(''),   // Bind to the formControlName in the template
      adults: [1, [Validators.required, Validators.min(1)]], // يجب أن يكون هناك بالغين
      children: [0, Validators.min(0)], // عدد الأطفال (يمكن أن يكون 0)
      infants: [0, Validators.min(0)], // عدد الرضع (يمكن أن يكون 0)
      additionalServices: [[]] // خدمات إضافية، يمكن أن تكون مصفوفة فارغة
    });
   
  }

  toggleComments() {
    this.showAllComments = !this.showAllComments;
  }
  loadTourDetails(): void {
    this.loading = true;
    this.tourService.getTourDetails(this.tourId).subscribe({
      next: (data) => {
        this.tourDetails = data;
        this.calculateTotalPrice();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error fetching tour details:', err);
        this.error = 'Failed to load tour details. Please try again later.';
        this.loading = false;
      }
    });
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  setActiveTab(tab: string): void {
    this.activeTab = tab;
  }

  isServiceSelected(serviceName: string): boolean {
    return this.selectedServices[serviceName] === true;
  }

  toggleService(serviceName: string, price: number): void {
    this.selectedServices[serviceName] = !this.selectedServices[serviceName];
    this.calculateTotalPrice();
  }
  updateGuestCount(guestType: string, change: number): void {
    const currentCount = this.bookingForm.get(guestType)?.value;
    let newCount = currentCount + change;
  
    // منع العدد من النزول تحت الصفر أو أكثر من الحد الأقصى إذا كان لديك حد معين
    if (newCount < 0) newCount = 0;
  
    // تحديث قيمة الـ formControl للنوع المحدد (البالغين أو الأطفال)
    this.bookingForm.get(guestType)?.setValue(newCount);
  
    // تحديث إجمالي السعر بناءً على التغيير الجديد في عدد الضيوف
    this.calculateTotalPrice();
  }
  
  calculateTotalPrice(): void {
    if (!this.tourDetails) return;
  
    // احتساب السعر بناءً على نوع الضيوف
    let adultTotal = this.bookingForm.get('adults')?.value * (this.tourDetails.adultPrice || this.tourDetails.tourPrice);
    let childrenTotal = this.bookingForm.get('children')?.value * (this.tourDetails.childrenPrice || this.tourDetails.tourPrice * 0.5);
    let infantTotal = this.bookingForm.get('infants')?.value * (this.tourDetails.infantPrice || 0);
    
    // احتساب السعر الإجمالي
    let total = adultTotal + childrenTotal + infantTotal;
  
    // إضافة الرسوم الإضافية للخدمات المختارة
    if (this.tourDetails.additionalServiceFees) {
      for (const service of this.tourDetails.additionalServiceFees) {
        if (this.selectedServices[service.serviceName]) {
          total += service.price;
        }
      }
    }
  
    this.totalPrice = total;  // تحديث السعر الإجمالي
  }
  



 

  onDateChange(event: Event): void {
    this.selectedDate = (event.target as HTMLSelectElement).value;
    this.calculateTotalPrice();
  }

 


  getDateString(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  submitComment() {
    if (!this.newComment.content.trim() || !this.tourDetails) return;
  
    const token = localStorage.getItem('token');
    if (!token) {
      this.toastr.error('Please log in to add a comment.', 'Unauthorized');
      return;
    }
  
    const commentData = {
      content: this.newComment.content,
      tourId: this.tourDetails.id
    };
  
    this.tourService.addComment(commentData).subscribe({
      next: (response: any) => {
        const newComment: Comment = {
          userName: response.user?.userName || 'Anonymous',
          profilePicture: response.user?.profilePicture || 'assets/images/default-avatar.png',
          content: response.content,
          createdAt: response.createdAt || new Date().toISOString()
        };
  
        if (this.tourDetails) {
          if (!this.tourDetails.comments) {
            this.tourDetails.comments = [];
          }
          this.tourDetails.comments = [newComment, ...this.tourDetails.comments];
          this.newComment.content = '';
  
          this.cdr.detectChanges();
  
          // ✅ Show success toast
          this.toastr.success('Comment added successfully!', 'Success');
        }
      },
      error: (error) => {
        console.error('Error adding comment:', error);
        if (error.status === 401) {
          this.toastr.error('Your session has expired. Please log in again.', 'Unauthorized');
        } else {
          this.toastr.error('Failed to add comment. Please try again.', 'Error');
        }
      }
    });
  }
  

  
  selectedTime: string = '';  // الوقت المحدد


  // تحديث عدد الضيوف

  // تحديث إجمالي السعر بناءً على عدد الأشخاص
  updateTotalPrice() {
    // افترض أن السعر هو لكل شخص بالغ فقط.
    this.totalPrice = this.adults * 50; // قيمة افتراضية للسعر لكل شخص
    if (this.selectedDate) {
      // خصم السعر بناءً على التاريخ المحدد
      this.totalPrice += 10; // مثال لتعديل السعر حسب التاريخ
    }
  }

  // عند تغيير التاريخ المحدد
  
  formatDate(date: string): string {
    const dateObj = new Date(date);
    return dateObj.toISOString().split('T')[0];  // Format as yyyy-MM-dd
  }
  // دالة للحجز
  bookNow() {
    if (!this.tourDetails) return;
  
    // Get selected date and time from the form
    const selectedDate = this.bookingForm.value.selectedDate;
    const selectedTime = this.bookingForm.value.selectedTime;
  
    // Ensure you are formatting the date if necessary
    const formattedDate = this.formatDate(selectedDate);  // You can use a date formatting function if needed
  
    // Prepare the booking data
    const bookingData = {
      tourId: this.tourDetails.id,
      tourDate: formattedDate,  // Send the formatted date here
      tourTime: selectedTime,   // Send the selected time
      adultsCount: this.bookingForm.value.adults,
      childrenCount: this.bookingForm.value.children,
    };
  
    // Send the booking data
    this.tourService.bookTour(bookingData).subscribe({
      next: (response) => {
        this.toastr.success('Tour booked successfully!', 'Success');  // رسالة نجاح
        console.log('Booking response:', response);
      },
      error: (error) => {
        console.error('Error booking tour:', error);
        this.toastr.error('Failed to book tour. Please try again.', 'Error');  // رسالة فشل
      }
    });
  
  }
  
}
