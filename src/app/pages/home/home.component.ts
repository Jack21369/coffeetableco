import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';

@Component({
 selector: 'app-home',
 standalone: true,
 imports: [CommonModule],
 templateUrl: './home.component.html',
 styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
 private spline: Application | null = null;

 constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

 scrollToMenu() {
   const menuSection = document.getElementById('menu');
   if (menuSection) {
     menuSection.scrollIntoView({ behavior: 'smooth' });
   }
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