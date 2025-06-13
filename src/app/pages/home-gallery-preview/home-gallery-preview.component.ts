import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';

@Component({
  selector: 'app-home-gallery-preview',
  imports: [PrimaryBtnComponent, PreviewHeaderComponent],
  templateUrl: './home-gallery-preview.component.html',
  styleUrl: './home-gallery-preview.component.css'
})
export class HomeGalleryPreviewComponent implements AfterViewInit {
  @ViewChild('titleElement') titleElement!: ElementRef;

  constructor() { }

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

    // Start observing the title element
    if (this.titleElement?.nativeElement) {
      observer.observe(this.titleElement.nativeElement);
    }
  }
}
