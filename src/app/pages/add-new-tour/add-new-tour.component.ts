import { CommonModule, NgFor, NgIf } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.snow.css';
import { TourService } from '../../services/Tours/tour.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-new-tour',
  standalone: true,
  imports: [CommonModule, QuillModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-new-tour.component.html',
  styleUrls: ['./add-new-tour.component.scss'],
})
export class AddNewTourComponent implements OnInit {
  tourForm: FormGroup;
  weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  newTag: string = ''; // تعريف المتغير
  modules: any; // ✅ تعريف متغير modules
  availableDates: { date: Date; price: number; maxGuests: number }[] = [];

  @ViewChild('mainImage') mainImageInput!: ElementRef;
  @ViewChild('headerImage') headerImageInput!: ElementRef;
  @ViewChild('galleryImage') galleryImageInput!: ElementRef;

  mainImageUrl: string | null = null;
  headerImageUrl: string | null = null;

  currentDate = new Date();
  displayedMonth: number = this.currentDate.getMonth();
  displayedYear: number = this.currentDate.getFullYear();
  calendarData: any[] = [];

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private tourService: TourService,
    private toostr : ToastrService
  ) {
    this.tourForm = this.fb.group({
      tourTitle: [''],
      selectedCategory: [''],
      tourDays: [0],
      tourNights: [0],
      tourPrice: [''],
      adultPrice: [''],
      childrenPrice: [''],
      infantPrice: [''],
      featured: [false],
      verified: [false],
      guests: this.fb.group({
        adult: [0],
        child: [0],
        infant: [0],
        capacity: [0],
      }),
      tourPlans: this.fb.array([]),
      newPlace: new FormControl(''),

      places: this.fb.array([]),
      newTag: new FormControl(''),
      tags: this.fb.array([]),

      
      newStartTour: new FormControl(''),
      startTours: this.fb.array([]),
      newPickUp: new FormControl(''),
      pickUps: this.fb.array([]),



      headerImage: [null],
      galleryImages: this.fb.array([]),
      tourDescription: [''],
      facilities: this.fb.array([]),

      facts: this.fb.array([]),
      services: this.fb.array([]),
      includes: this.fb.array([]),
      excludes: this.fb.array([]),
      terms: this.fb.array([]),
      availableDates: [],
    });

    this.modules = {
      toolbar: [
        ['bold', 'italic', 'underline'], // أدوات التنسيق الأساسية
        [{ header: 1 }, { header: 2 }], // رؤوس
        [{ list: 'ordered' }, { list: 'bullet' }], // القوائم
        [{ align: [] }], // المحاذاة
        ['link', 'image'], // الروابط والصور
        ['clean'], // إزالة التنسيق
      ],
    };
    this.addTourPlan();
    this.addFacility();
    this.addInclude();
    this.addExclude();
    this.addFact();
    this.addService();
    this.addTerms();
  }

  ngOnInit() {
    this.currentDate = new Date();
    this.displayedMonth = this.currentDate.getMonth();
    this.displayedYear = this.currentDate.getFullYear();
    this.generateCalendar(); // توليد التقويم للشهر الحالي
  }

  get places(): FormArray {
    return this.tourForm.get('places') as FormArray;
  }

  get tags(): FormArray {
    return this.tourForm.get('tags') as FormArray;
  }

  get startTours(): FormArray {
    return this.tourForm.get('startTours') as FormArray;
  }
  
  get pickUps(): FormArray {
    return this.tourForm.get('pickUps') as FormArray;
  }
  // إرجاع الـ FormArray بشكل صحيح
  get facilities(): FormArray {
    return this.tourForm.get('facilities') as FormArray;
  }

  // Getter للحصول على `FormArray`
  get facts(): FormArray {
    return this.tourForm.get('facts') as FormArray;
  }

  get services(): FormArray {
    return this.tourForm.get('services') as FormArray;
  }

  // إرجاع `FormGroup` لكل عنصر عند التكرار في `*ngFor`

  // Getter للحصول على `FormArray`
  get includes(): FormArray {
    return this.tourForm.get('includes') as FormArray;
  }

  get excludes(): FormArray {
    return this.tourForm.get('excludes') as FormArray;
  }

  get terms(): FormArray {
    return this.tourForm.get('terms') as FormArray;
  }
  // إرجاع قائمة الخطط
  get tourPlans(): FormArray {
    return this.tourForm.get('tourPlans') as FormArray;
  }

  get guests() {
    return this.tourForm.get('guests') as FormGroup;
  }

  setButtonValue(field: 'featured' | 'verified') {
    this.tourForm.patchValue({ [field]: true });
  }
  addPlace() {
    const newPlaceValue = this.tourForm.get('newPlace')?.value.trim(); // قيمة المكان المدخل

    // نضيف المكان بناءً على الإدخال
    if (newPlaceValue) {
      this.places.push(new FormControl(newPlaceValue)); // إضافة المكان المدخل يدويًا
      this.tourForm.get('newPlace')?.setValue(''); // إعادة تعيين القيمة
    }
  }

  removePlace(index: number) {
    this.places.removeAt(index);
  }

  addStartTour() {
    const newStartTourValue = this.tourForm.get('newStartTour')?.value.trim();
    if (newStartTourValue) {
      this.startTours.push(new FormControl(newStartTourValue));
      this.tourForm.get('newStartTour')?.setValue('');
    }
  }

  removeStartTour(index: number) {
    this.startTours.removeAt(index);
  }
  
  // Add methods for pickUp
  addPickUp() {
    const newPickUpValue = this.tourForm.get('newPickUp')?.value.trim();
    if (newPickUpValue) {
      this.pickUps.push(new FormControl(newPickUpValue));
      this.tourForm.get('newPickUp')?.setValue('');
    }
  }

  removePickUp(index: number) {
    this.pickUps.removeAt(index);
  }
  

  trackByFn(index: number): number {
    return index;
  }
  // دالة لإضافة التاجات
   // دالة لإضافة التاجات
   addTag() {
    const newTagValue = this.tourForm.get('newTag')?.value.trim(); // قيمة التاج المدخل

    // نضيف التاج بناءً على الإدخال
    if (newTagValue) {
      this.tags.push(new FormControl(newTagValue)); // إضافة التاج المدخل يدويًا
      this.tourForm.get('newTag')?.setValue(''); // إعادة تعيين القيمة
    }
  }
  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  getFacilityFormGroup(index: number): FormGroup {
    return this.facilities.at(index) as FormGroup;
  }
  // إضافة عنصر جديد للمرافق
  addFacility() {
    this.facilities.push(
      this.fb.group({
        title: [''],
        description: [''],
      })
    );
  }

  // حذف عنصر من القائمة
  removeFacility(index: number) {
    this.facilities.removeAt(index);
  }

  getFactFormGroup(index: number): FormGroup {
    return this.facts.at(index) as FormGroup;
  }

  getServiceFormGroup(index: number): FormGroup {
    return this.services.at(index) as FormGroup;
  }
  addFact() {
    this.facts.push(this.fb.group({ title: '', number: '', description: '' }));
  }

  addService() {
    this.services.push(this.fb.group({ name: '', price: '', description: '' }));
  }

  // حذف عنصر معين من `FormArray`
  removeFact(index: number) {
    if (this.facts.length > 1) {
      this.facts.removeAt(index);
    }
  }

  removeService(index: number) {
    if (this.services.length > 1) {
      this.services.removeAt(index);
    }
  }

  // إرجاع `FormGroup` لكل عنصر عند التكرار في `*ngFor`
  getIncludeFormGroup(index: number): FormGroup {
    return this.includes.at(index) as FormGroup;
  }

  getExcludeFormGroup(index: number): FormGroup {
    return this.excludes.at(index) as FormGroup;
  }
  addInclude() {
    this.includes.push(this.fb.group({ option: [''] }));
  }

  addExclude() {
    this.excludes.push(this.fb.group({ option: [''] }));
  }

  // حذف عنصر معين من `FormArray`
  removeInclude(index: number) {
    if (this.includes.length > 1) {
      this.includes.removeAt(index);
    }
  }

  removeExclude(index: number) {
    if (this.excludes.length > 1) {
      this.excludes.removeAt(index);
    }
  }

  getTermFormGroup(index: number): FormGroup {
    return this.terms.at(index) as FormGroup;
  }

  // إضافة عنصر جديد إلى `FormArray`
  addTerms() {
    this.terms.push(this.fb.group({ title: '', description: '' }));
  }

  // حذف عنصر معين من `FormArray`
  removeTerms(index: number) {
    if (this.terms.length > 1) {
      this.terms.removeAt(index);
    }
  }
  addTourPlan() {
    this.tourPlans.push(
      this.fb.group({
        title: [''],
        description: [''],
        imageUrl: [null], // لحفظ الصورة كـ Base64
      })
    );
  }

  // حذف خطة معينة
  deleteItem(index: number) {
    this.tourPlans.removeAt(index);
  }

  triggerFileInput(imageType: string) {
    if (imageType === 'mainImage') {
      this.mainImageInput.nativeElement.click();
    } else if (imageType === 'headerImage') {
      this.headerImageInput.nativeElement.click();
    } else if (imageType === 'galleryImage') {
      this.galleryImageInput.nativeElement.click();
    }
  }

  onFileSelected(event: Event, imageType: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    if (imageType === 'galleryImage') {
      this.uploadGalleryImages(input.files);
    } else {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        if (imageType === 'mainImage') {
          this.mainImageUrl = reader.result as string;
          this.tourForm.patchValue({ mainImage: this.mainImageUrl });
        } else if (imageType === 'headerImage') {
          this.headerImageUrl = reader.result as string;
          this.tourForm.patchValue({ headerImage: this.headerImageUrl });
        }
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
  get galleryImages(): FormArray {
    return this.tourForm.get('galleryImages') as FormArray;
  }
  uploadGalleryImages(files: FileList) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.galleryImages.push(new FormControl(reader.result as string));
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

  uploadFile(event: Event, index: number) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        this.tourPlans.at(index).patchValue({ imageUrl: reader.result });
      };

      reader.readAsDataURL(file);
    }
  }

  removeImage(index: number) {
    this.galleryImages.removeAt(index);
    this.cdr.detectChanges();
  }
  generateCalendar() {
    const firstDay = new Date(this.displayedYear, this.displayedMonth, 1);
    const lastDay = new Date(this.displayedYear, this.displayedMonth + 1, 0);
    const daysInMonth = lastDay.getDate();

    this.calendarData = [];
    for (let day = 1; day <= daysInMonth; day++) {
      this.calendarData.push({
        date: new Date(this.displayedYear, this.displayedMonth, day),
        price:
          Math.random() > 0.5 ? Math.floor(Math.random() * 5000) + 1000 : null,
        optionsForm: false,
        priceSet: false, // للتأكد من عرض السعر فقط بعد تحديده
        maxGuests: 0,
        adultPrice: 0,
        childrenPrice: 0,
      });
    }
  }
  changeMonth(step: number) {
    this.displayedMonth += step;
    if (this.displayedMonth < 0) {
      this.displayedMonth = 11;
      this.displayedYear--;
    } else if (this.displayedMonth > 11) {
      this.displayedMonth = 0;
      this.displayedYear++;
    }
    this.generateCalendar();
  }

  openOptionsForm(day: any) {
    day.optionsForm = true; // فتح الفورم عند الضغط على السهم
  }
  selectDate(day: any) {
    const dateIndex = this.availableDates.findIndex(
      (d: any) => new Date(d.date).getTime() === day.date.getTime()
    );

    if (dateIndex !== -1) {
      this.availableDates.splice(dateIndex, 1);
    } else {
      this.availableDates.push({
        date: day.date,
        price: day.price,
        maxGuests: day.maxGuests,
      });
    }

    this.tourForm.patchValue({ availableDates: this.availableDates });
  }

  isSelected(date: Date): boolean {
    return this.availableDates.some((d) => d.date.getTime() === date.getTime());
  }

  updatePrice(day: any, event: any) {
    day.price = event.target.value;
  }
  setPrice(day: any) {
    if (day.maxGuests && day.adultPrice >= 0 && day.childrenPrice >= 0) {
      const totalPrice =
        day.adultPrice * day.maxGuests + day.childrenPrice * day.maxGuests;
      console.log('Total Price:', totalPrice); // تحقق من السعر
      day.price = totalPrice;
      day.priceSet = true;
      day.optionsForm = false;
      console.log('Updated Day:', day); // تحقق من التحديثات
    }
  }

  prepareTourPayload(): any {
    const formValue = this.tourForm.value;

    const payload = {
      id: 0,
      tourTitle: formValue.tourTitle,
      tourCategory: +formValue.selectedCategory,
      tourDay: +formValue.tourDays,
      tourNight: +formValue.tourNights,
      tourPrice: +formValue.tourPrice,
      adultPrice: +formValue.adultPrice,
      childrenPrice: +formValue.childrenPrice,
      infantPrice: +formValue.infantPrice,
      guestsCapabilityAdult: +formValue.guests.adult,
      guestsCapabilityChildren: +formValue.guests.child,
      guestsCapabilityInfant: +formValue.guests.infant,
      tourDescription: formValue.tourDescription,

      startTour: formValue.startTours.length > 0 ? formValue.startTours[0] : "",
      pickUp: formValue.pickUps.length > 0 ? formValue.pickUps[0] : "",
      mainImage: this.mainImageUrl,
      headerImages: [this.headerImageUrl],
      galleryImages: formValue.galleryImages,
      places: formValue.places,
      tourTags: formValue.tags,
      tourPlans: formValue.tourPlans.map((plan: any) => ({
        title: plan.title,
        description: plan.description,
      })),
      tourIncludes: formValue.includes.map((i: any) => i.option),
      tourExcludes: formValue.excludes.map((e: any) => e.option),
      tourFacilities: formValue.facilities.map((f: any) => ({
        title: f.title,
        description: f.description,
      })),
      tourFacts: formValue.facts.map((f: any) => ({
        title: f.title,
        value: f.number,
        description: f.description,
      })),
      additionalServiceFees: formValue.services.map((s: any) => ({
        serviceName: s.name,
        price: +s.price,
        description: s.description,
      })),
      termsAndConditions: formValue.terms.map((t: any) => ({
        title: t.title,
        description: t.description,
      })),
      availableDates: this.availableDates,
      isFeatured: formValue.featured,
      isVerified: formValue.verified,
      isDeleted: false,
    };

    return payload;
  }

  submitTour() {
    const payload = this.prepareTourPayload();

    this.tourService.submitTourData(payload).subscribe({
      next: (res) => {
        this.toostr.success('Tour created successfully', 'Success');
      },
      error: (err) => {
        this.toostr.error('Error creating tour', 'Failed');
      },
    });
  }
}
