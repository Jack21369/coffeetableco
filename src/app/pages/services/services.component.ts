import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from '../../components/secondary-btn/secondary-btn.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule, ReactiveFormsModule, PrimaryBtnComponent, SecondaryBtnComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit {
  contactForm: FormGroup;
  inquiryTypes = ['Catering', 'Artists', 'Inquiries'];
  selectedType = 'Inquiries';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      inquiryType: ['Inquiries', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Here you would typically send the form data to your backend
      console.log(this.contactForm.value);
      // Reset form after submission
      this.contactForm.reset();
      this.contactForm.patchValue({ inquiryType: 'Inquiries' });
    }
  }
}
