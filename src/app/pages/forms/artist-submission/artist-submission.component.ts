import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryBtnComponent } from '../../../components/primary-btn/primary-btn.component';
import { FormService } from '../../../services/form.service';

@Component({
  selector: 'app-artist-submission',
  standalone: true,
  imports: [CommonModule, RouterModule, PrimaryBtnComponent],
  templateUrl: './artist-submission.component.html',
  styleUrl: './artist-submission.component.css'
})
export class ArtistSubmissionComponent implements OnInit, AfterViewInit {
  @ViewChild('contactFormContainer', { read: ElementRef }) contactFormElement!: ElementRef;
  referralOptions: string[] = [];

  constructor(private formService: FormService) {}

  ngOnInit(): void {
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
}
