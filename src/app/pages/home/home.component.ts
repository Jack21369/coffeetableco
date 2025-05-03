import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';
import { SecondaryBtnComponent } from '../../components/secondary-btn/secondary-btn.component';
import { HomeMenuPreviewComponent } from '../home-menu-preview/home-menu-preview.component';
import { HomeServicePreviewComponent } from '../home-service-preview/home-service-preview.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    PrimaryBtnComponent,
    SecondaryBtnComponent,
    HomeMenuPreviewComponent,
    HomeServicePreviewComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  private spline: Application | null = null;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router
  ) {}

  navigateToMenu() {
    this.router.navigate(['/menu']);
  }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(async () => {
        try {
          const canvas = document.getElementById('canvas3d') as HTMLCanvasElement;
          if (!canvas) {
            console.error('Canvas element not found');
            return;
          }

          // Initialize Spline
          this.spline = new Application(canvas);
          
          // Load the Spline scene
          await this.spline.load('https://prod.spline.design/lxLHzMvvS6jf8HJm/scene.splinecode');
        } catch (error) {
          console.error('Error initializing Spline:', error);
        }
      }, 100);
    }
  }

  ngOnDestroy(): void {
    if (this.spline) {
      this.spline = null;
    }
  }
}