import { Component, Input, ElementRef, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-preview-header',
  standalone: true,
  templateUrl: './preview-header.component.html',
  styleUrls: ['./preview-header.component.css']
})
export class PreviewHeaderComponent implements AfterViewInit {
  @Input() label: string = '';
  @Input() header: string = '';

  @ViewChild('labelElement') labelElement!: ElementRef;
  @ViewChild('headerElement') headerElement!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    if (this.labelElement?.nativeElement) {
      observer.observe(this.labelElement.nativeElement);
    }
    if (this.headerElement?.nativeElement) {
      observer.observe(this.headerElement.nativeElement);
    }
  }
}
