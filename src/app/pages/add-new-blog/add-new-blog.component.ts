import { CommonModule, NgFor } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import 'quill/dist/quill.snow.css';
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


  constructor(private fb: FormBuilder,private cdr: ChangeDetectorRef) {
    this.blogForm = this.fb.group({
      title: [''],
      categories: this.fb.array([]), // قيمة واحدة تختارها
      places: this.fb.array([]),
      newPlace: new FormControl(''), 
      newCategory: new FormControl(''),

      tags: this.fb.array([]), // مصفوفة العلامات
      newTag: new FormControl(''),
      mainImage: [null], // صورة رئيسية
      galleryImages: this.fb.array([]),
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
      this.blogForm.get('newTag')?.setValue(''); // إعادة ضبط القيمة
    }
  }

  removeTag(index: number) {
    this.tags.removeAt(index);
  }

  addCategory() {
    const newCategoryValue = this.blogForm.get('newCategory')?.value;
    if (newCategoryValue && newCategoryValue.trim()) {
      this.categories.push(new FormControl(newCategoryValue.trim()));
      this.blogForm.get('newCategory')?.setValue(''); // إعادة ضبط القيمة
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
  get galleryImages(): FormArray {
    return this.blogForm.get('galleryImages') as FormArray;
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

 

  removeImage(index: number) {
    this.galleryImages.removeAt(index);
    this.cdr.detectChanges();
  }
  onSubmit() {
    console.log(this.blogForm.value);
  }
  

}
