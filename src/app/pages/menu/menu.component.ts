import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemCardComponent } from '../../components/item-card/item-card.component';
import { MenuItem, DrinkCategory } from '../../shared/types/menu.types';
import { PrimaryBtnComponent } from '../../components/primary-btn/primary-btn.component';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, ItemCardComponent, PrimaryBtnComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent implements OnInit {
  categories: DrinkCategory[] = ['Specials', 'Classics', 'Non-Espresso'];

  signatureItems: MenuItem[] = [
    {
      name: 'Encore Espresso',
      category: 'Specials',
      description: 'Our smooth earl grey syrup with espresso and milk.',
      ingredients: 'Earl Grey Syrup • Espresso • Milk',
      price: 5.50,
      imageUrl: 'assets/images/latte.jpeg',
      index: '01',
      isRecommended: true
    },
    {
      name: 'Matcha Melody',
      category: 'Non-Espresso',
      description: 'A sweetened matcha topped with sweet cream cold foam. Fruity pebble topping recommended',
      ingredients: 'Matcha • Sweet Cream Cold Foam • Fruity Pebbles',
      price: 6.50,
      imageUrl: 'assets/images/latte.jpeg',
      index: '02',
      isRecommended: true
    },
    {
      name: 'Hazelnut Harmony',
      category: 'Specials',
      description: 'A hazelnut latte topped with sweet cream cold foam. Graham cracker topping recommended',
      ingredients: 'Hazelnut • Espresso • Sweet Cream Cold Foam • Graham Cracker',
      price: 6.50,
      imageUrl: 'assets/images/latte.jpeg',
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
      imageUrl: 'assets/images/latte.jpeg',
      index: '04'
    },
    {
      name: 'Autumn Blend Tea',
      category: 'Non-Espresso',
      description: 'A warming blend of autumn spices and premium tea',
      ingredients: 'Autumn Blend Tea',
      price: 3.50,
      imageUrl: 'assets/images/latte.jpeg',
      index: '05'
    },
    {
      name: 'Ginger Turmeric Tea',
      category: 'Non-Espresso',
      description: 'A soothing blend of ginger and turmeric',
      ingredients: 'Ginger • Turmeric • Tea',
      price: 3.50,
      imageUrl: 'assets/images/latte.jpeg',
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
      imageUrl: 'assets/images/latte.jpeg',
      index: '07'
    },
    {
      name: 'Cappuccino',
      category: 'Classics',
      description: 'Espresso topped with steamed milk and thick foam',
      ingredients: 'Espresso • Steamed Milk • Foam',
      price: 4.50,
      imageUrl: 'assets/images/latte.jpeg',
      index: '08'
    },
    {
      name: 'Americano',
      category: 'Classics',
      description: 'Smooth espresso with iced/hot water',
      ingredients: 'Espresso • Water',
      price: 3.00,
      imageUrl: 'assets/images/latte.jpeg',
      index: '09'
    },
    {
      name: 'DRIP Coffee',
      category: 'Classics',
      description: 'Bold, classic brewed coffee',
      ingredients: 'Fresh Ground Coffee',
      price: 3.50,
      imageUrl: 'assets/images/latte.jpeg',
      index: '10'
    },
    {
      name: 'Espresso',
      category: 'Classics',
      description: 'Double Shot of Espresso',
      ingredients: 'Double Shot Espresso',
      price: 3.00,
      imageUrl: 'assets/images/latte.jpeg',
      index: '11'
    },
    {
      name: 'Groundwork Coffee Beans',
      category: 'Classics',
      description: 'Organic Bitches Brew- Notes of Dark Chocolate and Caramel- 12 oz',
      ingredients: 'Organic Coffee Beans',
      price: 16.00,
      imageUrl: 'assets/images/latte.jpeg',
      index: '12'
    }
  ];

  get allItems(): MenuItem[] {
    return [...this.signatureItems, ...this.seasonalItems, ...this.popularItems];
  }

  get groupedItems(): { [key in DrinkCategory]: MenuItem[] } {
    return this.categories.reduce((acc, category) => {
      acc[category] = this.allItems.filter(item => item.category === category);
      return acc;
    }, {} as { [key in DrinkCategory]: MenuItem[] });
  }

  scrollToCategory(category: DrinkCategory) {
    const el = document.getElementById(category);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  ngOnInit() {
    // Additional initialization logic if needed
  }
}
