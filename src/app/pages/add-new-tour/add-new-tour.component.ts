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
  selectedDates: Date[] = []; // قائمة الأيام المختارة

  @ViewChild('mainImage') mainImageInput!: ElementRef;
  @ViewChild('headerImage') headerImageInput!: ElementRef;
  @ViewChild('galleryImage') galleryImageInput!: ElementRef;

  mainImageUrl: string | null = null;
  headerImageUrl: string | null = null;

  currentDate = new Date();
  displayedMonth: number = this.currentDate.getMonth();
  displayedYear: number = this.currentDate.getFullYear();
  calendarData: any[] = [];

  constructor(private fb: FormBuilder, private cdr: ChangeDetectorRef) {
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
      headerImage: [null],
      galleryImages: this.fb.array([]),
      tourDescription: [''],
      facilities: this.fb.array([]),

      facts: this.fb.array([]),
      services: this.fb.array([]),
      includes: this.fb.array([]),
      excludes: this.fb.array([]),
      terms: this.fb.array([]),
      selectedDates: [[]],
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
    const newPlaceValue = this.tourForm.get('newPlace')?.value;
    if (newPlaceValue && newPlaceValue.trim()) {
      this.places.push(new FormControl(newPlaceValue.trim()));
      this.tourForm.get('newPlace')?.setValue(''); // إعادة تعيين الاختيار بعد الإضافة
    }
  }

  removePlace(index: number) {
    this.places.removeAt(index);
  }

  trackByFn(index: number): number {
    return index;
  }
  addTag() {
    const newTagValue = this.tourForm.get('newTag')?.value;
    if (newTagValue && newTagValue.trim()) {
      this.tags.push(new FormControl(newTagValue.trim()));
      this.tourForm.get('newTag')?.setValue(''); // إعادة ضبط القيمة
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
    this.includes.push(this.fb.group({ option: ['Choose multiple options'] }));
  }

  addExclude() {
    this.excludes.push(this.fb.group({ option: ['Choose multiple options'] }));
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
  selectDate(day: any) {
    const dateIndex = this.selectedDates.findIndex(
      (d) => d.getTime() === day.date.getTime()
    );

    if (dateIndex !== -1) {
      // إذا كان اليوم موجودًا بالفعل، قم بإزالته (إلغاء التحديد)
      this.selectedDates.splice(dateIndex, 1);
    } else {
      // إذا لم يكن موجودًا، أضفه إلى القائمة
      this.selectedDates.push(day.date);
    }

    // تحديث الفورم بالقائمة الجديدة
    this.tourForm.patchValue({ selectedDates: this.selectedDates });
  }

  isSelected(date: Date): boolean {
    return this.selectedDates.some((d) => d.getTime() === date.getTime());
  }
  updatePrice(day: any, event: any) {
    day.price = event.target.value;
  }

  submitData() {
    if (this.tourForm.valid) {
      console.log('Form Data:', this.tourForm.value);
    } else {
      console.log('Form is invalid');
    }
  }
}
