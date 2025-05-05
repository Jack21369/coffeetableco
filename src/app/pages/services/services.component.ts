import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
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
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('contactFormContainer', { read: ElementRef }) contactFormElement!: ElementRef;
  contactForm: FormGroup;
  inquiryTypes = ['General Inquiry', 'Catering', 'Event Booking', 'Other'];
  selectedType = 'General Inquiry';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      inquiryType: ['General Inquiry'],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Additional initialization logic if needed
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  private setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, {
      threshold: 0.1
    });

    const contactFormElement = this.contactFormElement.nativeElement;
    observer.observe(contactFormElement);
  }

  onSubmit() {
    if (this.contactForm.valid) {
      // Here you would typically send the form data to your backend
      console.log(this.contactForm.value);
      // Reset form after submission
      this.contactForm.reset();
      this.contactForm.patchValue({ inquiryType: 'General Inquiry' });
    }
  }
}
