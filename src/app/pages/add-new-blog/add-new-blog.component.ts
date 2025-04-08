import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.snow.css';
import { BlogService } from '../../services/dashBlog/blog.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-new-blog',
  imports: [QuillModule,ReactiveFormsModule,FormsModule,CommonModule],
  templateUrl: './add-new-blog.component.html',
  styleUrl: './add-new-blog.component.scss'
})
export class AddNewBlogComponent {
  blogForm: FormGroup;
  modules: any; 
@ViewChild('mainImage') mainImageInput!: ElementRef;
  @ViewChild('galleryImage') galleryImageInput!: ElementRef;

  mainImageUrl: string | null = null;
  availablePlaces: string[] = ['Paris', 'London', 'New York', 'Tokyo']; // القائمة المقررة مسبقًا
  availableCategories = ['Technology', 'Lifestyle', 'Travel', 'Food'];  // فئات مدخلة مسبقًا
  availableTags = ['Travel', 'Tech', 'Lifestyle', 'Food', 'Health'];  // وسوم مدخلة مسبقًا




  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef ,
    private blogService: BlogService,
    private toostr : ToastrService
  ) {
    this.blogForm = this.fb.group({
      title: [''],
      categories: this.fb.array([]), // قيمة واحدة تختارها
      places: this.fb.array([]),
      newPlace: new FormControl(''), 
      newCategory: new FormControl(''),

      tags: this.fb.array([]), // مصفوفة العلامات
      newTag: new FormControl(''),
      mainImage: [null], // صورة رئيسية
      headerImages: this.fb.array([]),
      description: [''] // الوصف
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
  }

  get places(): FormArray {
    return this.blogForm.get('places') as FormArray;
  }

  // Getter for Tags
  get tags(): FormArray {
    return this.blogForm.get('tags') as FormArray;
  }

  get categories(): FormArray {
    return this.blogForm.get('categories') as FormArray;
  }

  addPlace() {
    const newPlaceValue = this.blogForm.get('newPlace')?.value;
    if (newPlaceValue && newPlaceValue.trim()) {
      this.places.push(new FormControl(newPlaceValue.trim()));
      this.blogForm.get('newPlace')?.setValue(''); // إعادة تعيين الاختيار بعد الإضافة
    }
  }
  trackByFn(index: number): number {
    return index;
  }

  removePlace(index: number) {
    this.places.removeAt(index);
  }
  addTag() {
    const newTagValue = this.blogForm.get('newTag')?.value;
    if (newTagValue && newTagValue.trim()) {
      this.tags.push(new FormControl(newTagValue.trim()));
      this.blogForm.get('newTag')?.setValue('');  // إعادة تعيين المدخل بعد الإضافة
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  addCategory() {
    const newCategoryValue = this.blogForm.get('newCategory')?.value;
    if (newCategoryValue && newCategoryValue.trim()) {
      this.categories.push(new FormControl(newCategoryValue.trim()));
      this.blogForm.get('newCategory')?.setValue('');  // إعادة تعيين المدخل بعد الإضافة
    }
  }
  removeCategory(index: number) {
    this.categories.removeAt(index);
  }



  
  triggerFileInput(imageType: string) {
    if (imageType === 'mainImage') {
      this.mainImageInput.nativeElement.click();
    } 
    else if (imageType === 'galleryImage') {
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
          this.blogForm.patchValue({ mainImage: this.mainImageUrl });
        } 
        this.cdr.detectChanges();
      };

      reader.readAsDataURL(file);
    }
  }
  get headerImages(): FormArray {
    return this.blogForm.get('headerImages') as FormArray;
  }
  uploadGalleryImages(files: FileList) {
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.headerImages.push(new FormControl(reader.result as string));
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(file);
    });
  }

 

  removeImage(index: number) {
    this.headerImages.removeAt(index);
    this.cdr.detectChanges();
  }
  stripHtml(html: string): string {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  }
  submitBlog() {
    if (this.blogForm.valid) {
      const formData = this.blogForm.value;
  
      const requestData = {
        title: formData.title,
        description: this.stripHtml(formData.description), // إزالة الوسوم
        mainImage: formData.mainImage || "",
        headerImages: formData.headerImages.length > 0 ? formData.headerImages.join(",") : "",
        categoryName: formData.categories.length > 0 ? formData.categories[0] : "",
        places: formData.places || [],
        tags: formData.tags || []
      };
  
      this.blogService.addBlog(requestData).subscribe({
        next: (response) => {
          console.log('Blog added successfully:', response);
          this.toostr.success('Blog added successfully!', 'Success');
  
          // ✅ إعادة ضبط الحقول العادية
          this.blogForm.reset();
  
          // ✅ إعادة ضبط الـ FormArray (المصفوفات) بشكل صحيح
          (this.blogForm.get('tags') as FormArray).clear();
          (this.blogForm.get('places') as FormArray).clear();
          
          (this.blogForm.get('headerImages') as FormArray).clear();
          (this.blogForm.get('categories') as FormArray).clear();

          this.blogForm.patchValue({ mainImage: null });
          this.mainImageUrl = null;
  
          // ✅ جعل الفورم كأنه لم يتم لمسه أو تغييره
          this.blogForm.markAsPristine();
          this.blogForm.markAsUntouched();
  
        },
        error: (error) => {
          console.error('Error adding blog:', error);
          this.toostr.error('Failed to add blog. Please try again.', 'Error');
        }
      });
    } else {
      this.toostr.warning('Please fill all required fields.', 'Warning');
    }
  }
  
  
  
  

}
