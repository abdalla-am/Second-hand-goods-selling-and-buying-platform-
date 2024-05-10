import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  categories = [
    { value: 'all', label: 'All Categories', icon: 'fas fa-th-large',ads: 69590 },
    { value: 'mobiles', label: 'Mobiles', icon: 'fas fa-mobile-alt' , ads: 30120 },
    { value: 'electronics', label: 'Electronics', icon: 'fas fa-laptop', ads: 30120 },
    { value: 'vehicles', label: 'Vehicles', icon: 'fas fa-car' , ads: 25890 },
    { value: 'properties', label: 'Properties', icon: 'fas fa-home', ads: 30120 },
    { value: 'essentials', label: 'Essentials', icon: 'fas fa-shopping-cart' , ads: 15340  },
    { value: 'home-living', label: 'Home & Living', icon: 'fas fa-couch' , ads: 18750  },
    { value: 'business', label: 'Business Industry', icon: 'fas fa-briefcase' , ads: 10980 },
    { value: 'education', label: 'Education', icon: 'fas fa-graduation-cap' , ads: 8670 },
    { value: 'books', label: 'Books', icon: 'fas fa-book' ,  ads: 12450 },
    { value: 'fitness', label: 'Fitness', icon: 'fas fa-dumbbell' ,  ads: 6890  },
    { value: 'animals-pets', label: 'Animals & Pets', icon: 'fas fa-paw',  ads: 9210  }
  ];

  constructor() { }
  
  getCategories() {
    return this.categories;
  }
  getCategory(value: string): string | undefined {
    const category = this.categories.find(category => category.label === value);
    return category ? category.value : undefined;
  }
}
