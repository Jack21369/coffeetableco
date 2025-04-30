export type DrinkCategory = 'Specials' | 'Classics' | 'Non-Espresso';

export interface MenuItem {
    name: string;
    description: string;
    price: number;
    imageUrl: string;
    category: DrinkCategory;
    ingredients?: string;
    index?: string;
    isRecommended?: boolean;
} 