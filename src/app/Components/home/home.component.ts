import { Component } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { AdsListService } from '../../Services/ads-list.service';
import { Ads } from '../../Interfaces/ads';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories: any;
  ads: Ads[] = [];

  constructor(private categoryService: CategoriesService, private adService: AdsListService , private router: Router) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.ads = this.adService.getAllAds();
  }
  navigateToAds(category: string) {
    this.router.navigate(['/ads', category]); // Navigate to the ads component with the selected category
  }
}
