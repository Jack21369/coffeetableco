import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { MenuItem, DrinkCategory } from '../../shared/types/menu.types';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink, ItemCardComponent, NavbarComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  selectedCategory: 'ALL' | DrinkCategory = 'ALL';
  
  categories: ('ALL' | DrinkCategory)[] = ['ALL', 'Specials', 'Classics', 'Non-Espresso'];

  signatureItems: MenuItem[] = [
    {
      name: 'Encore Espresso',
      category: 'Specials',
      description: 'Our smooth earl grey syrup with espresso and milk.',
      ingredients: 'Earl Grey Syrup • Espresso • Milk',
      price: 5.50,
      imageUrl: 'https://images.unsplash.com/photo-1529892485617-25f63cd7b1e9?q=80&w=1200',
      index: '01',
      isRecommended: true
    },
    {
      name: 'Matcha Melody',
      category: 'Non-Espresso',
      description: 'A sweetened matcha topped with sweet cream cold foam. Fruity pebble topping recommended',
      ingredients: 'Matcha • Sweet Cream Cold Foam • Fruity Pebbles',
      price: 6.50,
      imageUrl: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=1200',
      index: '02',
      isRecommended: true
    },
    {
      name: 'Hazelnut Harmony',
      category: 'Specials',
      description: 'A hazelnut latte topped with sweet cream cold foam. Graham cracker topping recommended',
      ingredients: 'Hazelnut • Espresso • Sweet Cream Cold Foam • Graham Cracker',
      price: 6.50,
      imageUrl: 'https://images.unsplash.com/photo-1585494156145-1c60a4fe952b?q=80&w=1200',
      index: '03'
    }
  ];

  seasonalItems: MenuItem[] = [
    {
      name: 'White Chocolate Mocha Latte',
      category: 'Specials',
      description: 'White chocolate mocha sauce with espresso and milk',
      ingredients: 'White Chocolate • Espresso • Milk',
      price: 5.80,
      imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200',
      index: '04'
    },
    {
      name: 'Autumn Blend Tea',
      category: 'Non-Espresso',
      description: 'A warming blend of autumn spices and premium tea',
      ingredients: 'Autumn Blend Tea',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?q=80&w=1200',
      index: '05'
    },
    {
      name: 'Ginger Turmeric Tea',
      category: 'Non-Espresso',
      description: 'A soothing blend of ginger and turmeric',
      ingredients: 'Ginger • Turmeric • Tea',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=1200',
      index: '06'
    }
  ];

  popularItems: MenuItem[] = [
    {
      name: 'Cafe Latte',
      category: 'Classics',
      description: 'Espresso shot and milk. Optional: Sweetener or cold foam',
      ingredients: 'Espresso • Milk',
      price: 5.00,
      imageUrl: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=1200',
      index: '07'
    },
    {
      name: 'Cappuccino',
      category: 'Classics',
      description: 'Espresso topped with steamed milk and thick foam',
      ingredients: 'Espresso • Steamed Milk • Foam',
      price: 4.50,
      imageUrl: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=1200',
      index: '08'
    },
    {
      name: 'Americano',
      category: 'Classics',
      description: 'Smooth espresso with iced/hot water',
      ingredients: 'Espresso • Water',
      price: 3.00,
      imageUrl: 'https://images.unsplash.com/photo-1551030173-122aabc4489c?q=80&w=1200',
      index: '09'
    },
    {
      name: 'DRIP Coffee',
      category: 'Classics',
      description: 'Bold, classic brewed coffee',
      ingredients: 'Fresh Ground Coffee',
      price: 3.50,
      imageUrl: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200',
      index: '10'
    },
    {
      name: 'Espresso',
      category: 'Classics',
      description: 'Double Shot of Espresso',
      ingredients: 'Double Shot Espresso',
      price: 3.00,
      imageUrl: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=1200',
      index: '11'
    },
    {
      name: 'Groundwork Coffee Beans',
      category: 'Classics',
      description: 'Organic Bitches Brew- Notes of Dark Chocolate and Caramel- 12 oz',
      ingredients: 'Organic Coffee Beans',
      price: 16.00,
      imageUrl: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1200',
      index: '12'
    }
  ];

  get allItems(): MenuItem[] {
    return [...this.signatureItems, ...this.seasonalItems, ...this.popularItems];
  }

  get filteredItems(): MenuItem[] {
    if (this.selectedCategory === 'ALL') {
      return this.allItems;
    }
    return this.allItems.filter(item => item.category === this.selectedCategory);
  }

  setCategory(category: 'ALL' | DrinkCategory) {
    this.selectedCategory = category;
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }
}
