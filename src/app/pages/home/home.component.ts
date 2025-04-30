import { Component, PLATFORM_ID, Inject } from '@angular/core';
import { Application } from '@splinetool/runtime';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { RouterModule, Router } from '@angular/router';
import { MenuItem } from '../../shared/types/menu.types';

@Component({
 selector: 'app-home',
 standalone: true,
 imports: [CommonModule, ItemCardComponent, RouterModule],
 templateUrl: './home.component.html',
 styleUrl: './home.component.css'
})
export class HomeComponent {
 private spline: Application | null = null;

 featuredItems: MenuItem[] = [
   {
     name: 'Encore Espresso',
     description: 'Double shot espresso with a hint of earl grey, perfectly balanced for a sophisticated taste.',
     price: 5.50,
     imageUrl: '/assets/images/latte.jpeg',
     category: 'Classics'
   },
   {
     name: 'Matcha Melody',
     description: 'Premium grade matcha green tea topped with our signature sweet cream cold foam.',
     price: 5.50,
     imageUrl: '/assets/images/latte.jpeg',
     category: 'Non-Espresso'
   },
   {
     name: 'Camo Thai',
     description: 'Rich Thai tea blend with a mesmerizing sweet cream swirl pattern.',
     price: 5.95,
     imageUrl: '/assets/images/latte.jpeg',
     category: 'Specials'
   }
 ];

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