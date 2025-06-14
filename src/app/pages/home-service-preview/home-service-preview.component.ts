import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { HostListener } from '@angular/core';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';

@Component({
  selector: 'app-home-service-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimaryBtnComponent,
    PreviewHeaderComponent
  ],
  templateUrl: './home-service-preview.component.html',
  styleUrl: './home-service-preview.component.css'
})
export class HomeServicePreviewComponent implements AfterViewInit {
  @ViewChild('titleElement') titleElement!: ElementRef;
  @ViewChild('mobileTitleElement') mobileTitleElement!: ElementRef;
  @ViewChild('servicesContainer') servicesContainer!: ElementRef;

  isMobile: Observable<boolean>;
  activeServiceIndex = 0;
  isProgrammaticScroll = false;
  visibleServices: Set<number> = new Set();
  private intersectionObserver: IntersectionObserver;

  services = [
    {
      title: 'PRIVATE EVENTS',
      subtitle: 'CURATED MENUS',
      description: 'Exceptional coffee, teas, and specialty drinks for your private events. From classic lattes to Thai tea and lemonade, we handle everything from setup to service.',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
      category: 'Private Events'
    },
    {
      title: 'EVENT THEMES',
      subtitle: 'IMMERSIVE EXPERIENCES',
      description: 'Transform your gathering with immersive, custom event themes. From cozy autumn nights to vibrant summer fiestas, we bring your vision to life.',
      imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      category: 'Event Themes'
    },
    {
      title: 'LIVE MUSIC',
      subtitle: 'ARTIST SHOWCASES',
      description: 'Experience the best of local talent. Our space hosts live performances, open mics, and artist showcases—perfect for music lovers and private events.',
      imageUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=80',
      category: 'Live Music'
    }
  ];

  constructor(private breakpointObserver: BreakpointObserver) {
    this.isMobile = this.breakpointObserver.observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(map(result => result.matches));
    
    this.intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -10% 0px'
      }
    );
  }

  ngAfterViewInit() {
    this.checkVisibility();
    this.setupIntersectionObserver();
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isProgrammaticScroll) return;
    this.checkVisibility();
    this.updateActiveServiceIndex();
  }

  private updateActiveServiceIndex() {
    const section = document.querySelector('.services-preview-section');
    if (!section) return;
    
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const scrollY = window.scrollY;
    const relativeScroll = Math.max(0, scrollY - sectionTop);
    const perSection = sectionHeight / this.services.length;
    const index = Math.min(this.services.length - 1, Math.floor(relativeScroll / perSection));
    
    if (this.activeServiceIndex !== index) {
      this.activeServiceIndex = index;
    }
  }

  checkVisibility() {
    // Check all service containers
    const serviceElements = document.querySelectorAll('.service-container');
    serviceElements.forEach((element: Element) => {
      const rect = (element as HTMLElement).getBoundingClientRect();
      const isVisible = rect.top < window.innerHeight * 0.8;
      if (isVisible) {
        element.classList.add('visible');
      }
    });
  }

  scrollToService(index: number) {
    this.isProgrammaticScroll = true;
    this.activeServiceIndex = index;
    
    setTimeout(() => {
      const anchor = document.getElementById('service-anchor-' + index);
      if (anchor) {
        const headerHeight = document.querySelector('app-navbar')?.clientHeight || 0;
        const elementPosition = anchor.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
      
      setTimeout(() => {
        this.isProgrammaticScroll = false;
      }, 600);
    }, 10);
  }

  private setupIntersectionObserver() {
    // Observe title elements
    if (this.titleElement?.nativeElement) {
      this.intersectionObserver.observe(this.titleElement.nativeElement);
    }
    if (this.mobileTitleElement?.nativeElement) {
      this.intersectionObserver.observe(this.mobileTitleElement.nativeElement);
    }

    // Observe all service containers
    const serviceElements = document.querySelectorAll('.service-container');
    serviceElements.forEach(element => {
      this.intersectionObserver.observe(element);
    });
  }
}
