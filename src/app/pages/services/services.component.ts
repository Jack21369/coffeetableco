import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FormsModule, ReactiveFormsModule, PrimaryBtnComponent],
  templateUrl: './services.component.html',
  styleUrl: './services.component.css'
})
export class ServicesComponent implements OnInit, AfterViewInit {
  @ViewChild('contactFormContainer', { read: ElementRef }) contactFormElement!: ElementRef;
  contactForm: FormGroup;
  artistForm: FormGroup;
  inquiryTypes = ['General Inquiry', 'Event Booking', 'Artist Submission'];
  selectedType = 'General Inquiry';
  drinkOptions = [
    'Encore Espresso',
    'Matcha Melody',
    'Hazelnut Harmony',
    'White Chocolate Mocha Latte',
    'Autumn Blend Tea',
    'Ginger Turmeric Tea',
    'Cafe Latte',
    'Cappuccino',
    'Americano',
    'DRIP Coffee',
    'Espresso',
    'Groundwork Coffee Beans'
  ];
  formError: string | null = null;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      numberOfPeople: ['', Validators.required],
      duration: ['', Validators.required],
      drinkSelection: [[], Validators.required],
      theme: [''],
      location: ['', Validators.required],
      inquiryType: ['General Inquiry', Validators.required],
      message: ['']
    });
    this.artistForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      instrument: ['', Validators.required],
      video: ['', Validators.required],
      setDuration: ['', Validators.required],
      motivation: ['']
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

  onTypeChange(type: string) {
    this.selectedType = type;
    this.contactForm.patchValue({ inquiryType: type });
  }

  onSubmit() {
    this.formError = null;
    if (this.selectedType === 'Artist Submission') {
      if (this.artistForm.valid) {
        console.log(this.artistForm.value);
        this.artistForm.reset();
      } else {
        this.formError = 'Please fill out all required fields and enter a valid email.';
        Object.values(this.artistForm.controls).forEach(control => control.markAsTouched());
      }
    } else {
      if (this.contactForm.valid) {
        console.log(this.contactForm.value);
        this.contactForm.reset();
        this.contactForm.patchValue({ inquiryType: 'General Inquiry' });
      } else {
        this.formError = 'Please fill out all required fields and enter a valid email.';
        Object.values(this.contactForm.controls).forEach(control => control.markAsTouched());
      }
    }
  }

  onDrinkCheckboxChange(event: Event, drink: string) {
    const checked = (event.target as HTMLInputElement).checked;
    let selected = this.contactForm.value.drinkSelection || [];
    if (checked) {
      if (selected.length < 3) {
        selected = [...selected, drink];
      }
    } else {
      selected = selected.filter((d: string) => d !== drink);
    }
    // Remove 'Barista\'s Choice' if user selects a drink
    selected = selected.filter((d: string) => d !== "Barista's Choice");
    this.contactForm.patchValue({ drinkSelection: selected });
  }

  onBusinessChooseChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    if (checked) {
      this.contactForm.patchValue({ drinkSelection: ["Barista's Choice"] });
    } else {
      this.contactForm.patchValue({ drinkSelection: [] });
    }
  }
}
