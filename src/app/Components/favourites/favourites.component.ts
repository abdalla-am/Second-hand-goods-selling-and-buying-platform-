import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
    categories: { value: string; label: string; icon: string; }[]= [];
   // Array to hold favorite items
   favorites: string[] = ['Bajaj Pulsar NS.DUAL.DISK.FRESH 2020', 'Samsung Galaxy A22 2021'];
   items = [
    { name: 'Bajaj Pulsar NS.DUAL.DISK.FRESH 2020', date: 'Jul 13, 2021', price: '$1,500.00', status: 'Active' },
    { name: 'Xiaomi Poco X2 (8/256) Hot Offer (Used)', date: 'Jul 13, 2021', price: '$2,300.00', status: 'Expired' },
    { name: 'Samsung Galaxy A22 2021', date: 'Jul 13, 2021', price: '$220.00', status: 'Expired' },
    { name: 'DORMAK Lift, 06 Person 07 Stops', date: 'Jul 13, 2021', price: '$80.00', status: 'Active' }
  ];
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

   toggleFavorite(name: string) {
    const index = this.favorites.indexOf(name);
    if (index !== -1) {
      this.favorites.splice(index, 1); // Remove the item from favorites array
    } 
  }
  
}
