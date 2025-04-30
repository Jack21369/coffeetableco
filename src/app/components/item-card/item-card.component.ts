import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

type DrinkCategory = 'Specials' | 'Classics' | 'Non-Espresso';

interface MenuItem {
  name: string;
  price: number;
  imageUrl: string;
  category: DrinkCategory;
  description: string;
  isRecommended?: boolean;
}

@Component({
  selector: 'app-item-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.css']
})
export class ItemCardComponent {
  @Input() item!: MenuItem;
  isFlipped = false;

  toggleFlip(): void {
    this.isFlipped = !this.isFlipped;
  }

  onViewDescription(event: Event): void {
    event.stopPropagation(); // Prevent flip when clicking the link
    // Implement view description functionality
    console.log('View description clicked for:', this.item.name);
  }
}
