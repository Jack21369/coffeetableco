import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-about-preview',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-about-preview.component.html',
  styleUrl: './home-about-preview.component.css'
})
export class HomeAboutPreviewComponent implements AfterViewInit {
  @ViewChild('titleElement') titleElement!: ElementRef;

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

    const titleElement = document.querySelector('.about-title-minimal');
    if (titleElement) {
      observer.observe(titleElement);
    }
  }
}
