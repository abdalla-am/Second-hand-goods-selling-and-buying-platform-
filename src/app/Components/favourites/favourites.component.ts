import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { UserAdsService } from '../../Services/user-ads.service';
@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.css'
})
export class FavouritesComponent {
    categories: { value: string; label: string; icon: string; }[]= [];
   // Array to hold favorite items
   favourites: any[] = [];

   constructor(private categoryService: CategoriesService , private userAdsService: UserAdsService) { }
 
   ngOnInit(): void {
     this.categories = this.categoryService.getCategories();
     this.userAdsService.getAdvertisementsForCurrentUserFavorites().subscribe(ads => {
       this.favourites = ads;
       alert(this.favourites.length)
     });
   }
  
}
