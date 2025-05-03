import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map, Observable } from 'rxjs';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-home-service-preview',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimaryBtnComponent
  ],
  templateUrl: './home-service-preview.component.html',
  styleUrl: './home-service-preview.component.css'
})
export class HomeServicePreviewComponent {
  isMobile: Observable<boolean>;
  activeServiceIndex = 0;
  isProgrammaticScroll = false;

  services = [
    {
      title: 'PRIVATE CATERING',
      subtitle: 'CURATED MENUS',
      description: 'Exceptional coffee and curated menus for your private events. We handle everything from setup to service, so you can enjoy the moment.',
      imageUrl: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1200&q=80',
      category: 'Private Catering'
    },
    {
      title: 'EVENT THEMES',
      subtitle: 'IMMERSIVE EXPERIENCES',
      description: 'Transform your gathering with immersive, custom event themes. From cozy autumn nights to vibrant summer fiestas, we bring your vision to life.',
      imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
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
    this.isMobile = this.breakpointObserver.observe([Breakpoints.Handset, Breakpoints.Small])
      .pipe(map((result: { matches: boolean }) => result.matches));
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (this.isProgrammaticScroll) return;
    const section = document.querySelector('.services-preview-section');
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + window.scrollY;
    const sectionHeight = rect.height;
    const scrollY = window.scrollY;
    const relativeScroll = Math.max(0, scrollY - sectionTop);
    const perSection = sectionHeight / this.services.length;
    const index = Math.min(this.services.length - 1, Math.floor(relativeScroll / perSection));
    this.activeServiceIndex = index;
  }

  scrollToService(index: number) {
    this.isProgrammaticScroll = true;
    this.activeServiceIndex = index;
    setTimeout(() => {
      const anchor = document.getElementById('service-anchor-' + index);
      if (anchor) {
        anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setTimeout(() => {
        this.isProgrammaticScroll = false;
      }, 600);
    }, 10);
  }
}
