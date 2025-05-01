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
     description: 'Our smooth earl grey syrup with espresso and milk.',
     price: 5.50,
     imageUrl: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?q=80&w=1200',
     category: 'Specials'
   },
   {
     name: 'Matcha Melody',
     description: 'A sweetened matcha topped with sweet cream cold foam. Fruity pebble topping recommended',
     price: 6.50,
     imageUrl: 'https://images.unsplash.com/photo-1545606159-a5f81fd3a798?q=80&w=1200',
     category: 'Non-Espresso'
   },
   {
     name: 'Hazelnut Harmony',
     description: 'A hazelnut latte topped with sweet cream cold foam. Graham cracker topping recommended',
     price: 6.50,
     imageUrl: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?q=80&w=1200',
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