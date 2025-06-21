import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';
import { FormService } from '../../../services/form.service';
import { ToastComponent } from '../../../components/toast/toast.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimaryBtnComponent, ToastComponent, FormsModule, HttpClientModule],
  templateUrl: './event-booking.component.html',
  styleUrl: './event-booking.component.css'
})
export class EventBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('contactFormContainer', { read: ElementRef }) contactFormElement!: ElementRef;
  @ViewChild('eventForm') eventForm!: NgForm;
  drinkOptions: string[] = [];
  referralOptions: string[] = [];
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';
  selectedDrinks: string[] = [];

  constructor(private formService: FormService, private http: HttpClient) {}

  ngOnInit(): void {
    this.drinkOptions = this.formService.getDrinkOptions();
    this.referralOptions = this.formService.getReferralOptions();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  onSubmit() {
    if (this.eventForm.valid) {
      const formData = new FormData();
      formData.append('access_key', 'b832ef8e-5bc5-4250-9c16-0b8364dc4d60');
      formData.append('subject', 'Event Booking - The Coffee Table Co');
      formData.append('from_name', 'The Coffee Table Co');
      
      const formValues = { ...this.eventForm.value, drinkSelection: this.selectedDrinks.join(', ') };

      Object.keys(formValues).forEach(key => {
        formData.append(key, formValues[key]);
      });

      this.http.post('https://api.web3forms.com/submit', formData)
        .subscribe({
          next: () => {
            this.showSuccessToast();
            this.eventForm.resetForm();
            this.selectedDrinks = [];
          },
          error: () => {
            this.showErrorToast();
          }
        });
    }
  }

  showSuccessToast() {
    this.toastMessage = 'Form submitted successfully!';
    this.toastType = 'success';
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
  }

  showErrorToast() {
    this.toastMessage = 'An error occurred. Please try again.';
    this.toastType = 'error';
    this.showToast = true;
    setTimeout(() => this.showToast = false, 3000);
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

  onDrinkCheckboxChange(event: Event, drink: string) {
    const checked = (event.target as HTMLInputElement).checked;

    if (checked) {
      if (this.selectedDrinks.length < 3) {
        this.selectedDrinks.push(drink);
      } else {
        (event.target as HTMLInputElement).checked = false;
      }
      const baristaChoiceInput = document.querySelector<HTMLInputElement>('input[value="Barista\'s Choice"]');
      if (baristaChoiceInput) {
        baristaChoiceInput.checked = false;
        this.selectedDrinks = this.selectedDrinks.filter(d => d !== "Barista's Choice");
      }
    } else {
      this.selectedDrinks = this.selectedDrinks.filter(d => d !== drink);
    }
  }

  onBusinessChooseChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    
    if (checked) {
      this.selectedDrinks = ["Barista's Choice"];
      const drinkSelectionInputs = document.querySelectorAll<HTMLInputElement>('input[name="drinkSelection"]');
      drinkSelectionInputs.forEach(input => {
        if (input.value !== "Barista's Choice") {
          input.checked = false;
        }
      });
    } else {
      this.selectedDrinks = [];
    }
  }
}
