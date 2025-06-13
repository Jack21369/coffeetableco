import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../shared/types/menu.types';
import { PreviewHeaderComponent } from '../../components/preview-header/preview-header.component';

@Component({
  selector: 'app-home-menu-preview',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, RouterModule, PreviewHeaderComponent],
  templateUrl: './home-menu-preview.component.html',
  styleUrl: './home-menu-preview.component.css'
})
export class HomeMenuPreviewComponent implements AfterViewInit {
  @ViewChild('labelElement') labelElement!: ElementRef;
  @ViewChild('featuredElement') featuredElement!: ElementRef;
  @ViewChild('drinksElement') drinksElement!: ElementRef;
  @ViewChild('menuLinkElement') menuLinkElement!: ElementRef;

  featuredItems: MenuItem[] = [
    {
      name: 'Encore Espresso',
      description: 'Our smooth earl grey syrup with espresso and milk.',
      price: 5.50,
      imageUrl: 'assets/images/latte.jpeg',
      category: 'Specials'
    },
    {
      name: 'Matcha Melody',
      description: 'A sweetened matcha topped with sweet cream cold foam. Fruity pebble topping recommended',
      price: 6.50,
      imageUrl: 'assets/images/latte.jpeg',
      category: 'Non-Espresso'
    },
    {
      name: 'Hazelnut Harmony',
      description: 'A hazelnut latte topped with sweet cream cold foam. Graham cracker topping recommended',
      price: 6.50,
      imageUrl: 'assets/images/latte.jpeg',
      category: 'Specials'
    }
  ];

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

    // Start observing all animated elements
    if (this.labelElement?.nativeElement) {
      observer.observe(this.labelElement.nativeElement);
    }
    if (this.featuredElement?.nativeElement) {
      observer.observe(this.featuredElement.nativeElement);
    }
    if (this.drinksElement?.nativeElement) {
      observer.observe(this.drinksElement.nativeElement);
    }
    if (this.menuLinkElement?.nativeElement) {
      observer.observe(this.menuLinkElement.nativeElement);
    }
  }
}
