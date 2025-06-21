import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  drinkOptions = [
    'Encore Espresso',
    'Matcha Melody',
    'Hazelnut Harmony',
    'White Chocolate Mocha Latte',
    'Autumn Blend Tea',
    'Ginger Turmeric Tea',
    'Cafe Latte',
    'Cappuccino',
    'Americano',
    'DRIP Coffee',
    'Espresso',
    'Groundwork Coffee Beans'
  ];

  referralOptions = ['Social Media', 'Online', 'Friends', 'Other'];

  constructor() { }

  getDrinkOptions() {
    return this.drinkOptions;
  }

  getReferralOptions() {
    return this.referralOptions;
  }
}
