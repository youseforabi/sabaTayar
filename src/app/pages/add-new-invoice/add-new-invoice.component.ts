import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-new-invoice',
  imports: [ReactiveFormsModule,NgIf],
  templateUrl: './add-new-invoice.component.html',
  styleUrl: './add-new-invoice.component.scss',
  standalone: true
})
export class AddNewInvoiceComponent {

  invoiceForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.invoiceForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      tourName: ['', Validators.required],
      description: [''],
      invoiceNumber: [, Validators.required],
      totalAmount: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      issueDate: ['', Validators.required],
      dueDate: ['', Validators.required],
      guests: this.fb.group({
        adult: ['', Validators.required],
        children: ['', Validators.required],
        infant: ['', Validators.required],
      })
    });
  }
  onSubmit() {
    if (this.invoiceForm.valid) {
      console.log('Invoice Data:', this.invoiceForm.value);
    }
  }

  hasError(controlName: string, error: string): boolean {
    return this.invoiceForm.controls[controlName].touched && this.invoiceForm.controls[controlName].hasError(error);
  }
}
