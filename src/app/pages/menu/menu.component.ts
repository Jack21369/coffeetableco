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
      category: 'Classics',
      description: 'Double shot espresso with a hint of earl grey, perfectly balanced for a sophisticated taste.',
      ingredients: 'Double Shot • Earl Grey',
      price: 5.50,
      imageUrl: '/assets/images/latte.jpeg',
      index: '01'
    },
    {
      name: 'Caramel Cloud',
      category: 'Specials',
      description: 'Our signature espresso with house-made caramel and velvety steamed milk.',
      ingredients: 'Espresso • Caramel • Milk',
      price: 6.00,
      imageUrl: '/assets/images/latte.jpeg',
      index: '02',
      isRecommended: true
    },
    {
      name: 'Hazelnut Harmony',
      category: 'Classics',
      description: 'Rich hazelnut-infused espresso with a touch of vanilla and cinnamon.',
      ingredients: 'Espresso • Hazelnut • Vanilla',
      price: 5.95,
      imageUrl: '/assets/images/latte.jpeg',
      index: '03'
    }
  ];

  seasonalItems: MenuItem[] = [
    {
      name: 'Matcha Melody',
      category: 'Non-Espresso',
      description: 'Premium grade matcha green tea topped with our signature sweet cream cold foam.',
      ingredients: 'Matcha • Sweet Cream',
      price: 5.50,
      imageUrl: '/assets/images/latte.jpeg',
      index: '04',
      isRecommended: true
    },
    {
      name: 'Pumpkin Spice Dream',
      category: 'Specials',
      description: 'Warm pumpkin spice latte with real pumpkin puree and a hint of cinnamon.',
      ingredients: 'Pumpkin • Spices • Espresso',
      price: 6.25,
      imageUrl: '/assets/images/latte.jpeg',
      index: '05'
    },
    {
      name: 'Peppermint Mocha',
      category: 'Specials',
      description: 'Rich chocolate mocha with refreshing peppermint and whipped cream.',
      ingredients: 'Chocolate • Peppermint • Espresso',
      price: 6.00,
      imageUrl: '/assets/images/latte.jpeg',
      index: '06'
    }
  ];

  popularItems: MenuItem[] = [
    {
      name: 'Camo Thai',
      category: 'Non-Espresso',
      description: 'Rich Thai tea blend with a mesmerizing sweet cream swirl pattern.',
      ingredients: 'Thai Tea • Sweet Cream',
      price: 5.95,
      imageUrl: '/assets/images/latte.jpeg',
      index: '07'
    },
    {
      name: 'Classic Latte',
      category: 'Classics',
      description: 'Smooth espresso with steamed milk and a delicate layer of foam.',
      ingredients: 'Espresso • Milk',
      price: 4.95,
      imageUrl: '/assets/images/latte.jpeg',
      index: '08'
    },
    {
      name: 'Iced Americano',
      category: 'Classics',
      description: 'Double shot of espresso over ice, perfect for hot days.',
      ingredients: 'Espresso • Ice',
      price: 4.50,
      imageUrl: '/assets/images/latte.jpeg',
      index: '09'
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
