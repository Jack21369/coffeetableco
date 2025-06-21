import { Component, OnInit, HostListener, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Router, NavigationEnd, RouterLink } from '@angular/router';
import { filter } from 'rxjs/operators';
import { PrimaryBtnComponent } from '../primary-btn/primary-btn.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, PrimaryBtnComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  menuOpen = false;
  isScrolled = false;
  isMobile = false;
  isVisible = false;
  isHome = false;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (isPlatformBrowser(this.platformId)) {
      if (this.isHome) {
        // Check if we're past the landing page (100vh = full screen height)
        const landingPageHeight = window.innerHeight;
        this.isVisible = window.scrollY > landingPageHeight * 0.1; // Show after 10% of viewport height
      } else {
        this.isVisible = true;
      }
      // Only apply scroll effect on mobile
      if (window.innerWidth <= 768) {
        this.isScrolled = window.scrollY > 0;
      }
    }
  }

  @HostListener('window:resize', [])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
    }
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.isMobile = window.innerWidth <= 768;
      this.checkRoute(this.router.url);
      this.onWindowScroll();
      this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((event: any) => {
        this.checkRoute(event.urlAfterRedirects || event.url);
        this.onWindowScroll();
      });
    }
  }

  checkRoute(url: string) {
    // Consider both '/' and '/home' as home page
    this.isHome = url === '/' || url.startsWith('/home');
    if (!this.isHome) {
      this.isVisible = true;
    }
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
}
