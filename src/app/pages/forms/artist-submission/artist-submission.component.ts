import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';
import { FormService } from '../../../services/form.service';
import { ToastComponent } from '../../../components/toast/toast.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-artist-submission',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimaryBtnComponent, ToastComponent, FormsModule, HttpClientModule],
  templateUrl: './artist-submission.component.html',
  styleUrl: './artist-submission.component.css'
})
export class ArtistSubmissionComponent implements OnInit, AfterViewInit {
  @ViewChild('contactFormContainer', { read: ElementRef }) contactFormElement!: ElementRef;
  @ViewChild('artistForm') artistForm!: NgForm;
  referralOptions: string[] = [];
  showToast = false;
  toastMessage = '';
  toastType: 'success' | 'error' = 'success';

  constructor(private formService: FormService, private http: HttpClient) {}

  ngOnInit(): void {
    this.referralOptions = this.formService.getReferralOptions();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  onSubmit() {
    if (this.artistForm.valid) {
      const formData = new FormData();
      formData.append('access_key', 'b832ef8e-5bc5-4250-9c16-0b8364dc4d60');
      formData.append('subject', 'Artist Submission - The Coffee Table Co');
      formData.append('from_name', 'The Coffee Table Co');

      Object.keys(this.artistForm.value).forEach(key => {
        formData.append(key, this.artistForm.value[key]);
      });

      this.http.post('https://api.web3forms.com/submit', formData)
        .subscribe({
          next: () => {
            this.showSuccessToast();
            this.artistForm.resetForm();
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
}
