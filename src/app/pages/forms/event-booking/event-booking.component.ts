import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-event-booking',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimaryBtnComponent],
  templateUrl: './event-booking.component.html',
  styleUrl: './event-booking.component.css'
})
export class EventBookingComponent implements OnInit, AfterViewInit {
  @ViewChild('contactFormContainer', { read: ElementRef }) contactFormElement!: ElementRef;
  drinkOptions: string[] = [];
  referralOptions: string[] = [];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
    this.drinkOptions = this.formService.getDrinkOptions();
    this.referralOptions = this.formService.getReferralOptions();
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

  onDrinkCheckboxChange(event: Event, drink: string) {
    const checked = (event.target as HTMLInputElement).checked;
    const drinkSelectionInputs = document.querySelectorAll<HTMLInputElement>('input[name="drinkSelection"]');
    
    if (checked) {
      // Count checked drink options (excluding Barista's Choice)
      const checkedDrinks = Array.from(drinkSelectionInputs).filter(input => 
        input.checked && input.value !== "Barista's Choice"
      );
      
      if (checkedDrinks.length > 3) {
        // Uncheck the current checkbox if more than 3 are selected
        (event.target as HTMLInputElement).checked = false;
        return;
      }
      
      // Uncheck Barista's Choice if a specific drink is selected
      const baristaChoiceInput = document.querySelector<HTMLInputElement>('input[value="Barista\'s Choice"]');
      if (baristaChoiceInput) {
        baristaChoiceInput.checked = false;
      }
    }
  }

  onBusinessChooseChange(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const drinkSelectionInputs = document.querySelectorAll<HTMLInputElement>('input[name="drinkSelection"]');
    
    if (checked) {
      // Uncheck all other drink options
      drinkSelectionInputs.forEach(input => {
        if (input.value !== "Barista's Choice") {
          input.checked = false;
        }
      });
    }
  }
}
