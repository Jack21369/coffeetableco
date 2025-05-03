import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { RouterModule } from '@angular/router';
import { MenuItem } from '../../shared/types/menu.types';

@Component({
  selector: 'app-home-menu-preview',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, RouterModule],
  templateUrl: './home-menu-preview.component.html',
  styleUrl: './home-menu-preview.component.css'
})
export class HomeMenuPreviewComponent {
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
      imageUrl: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=1200',
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
}
