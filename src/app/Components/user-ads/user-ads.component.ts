import { Component, OnDestroy } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Services/categories.service';
import { AdvertisementService } from '../../Services/advertisement.service';
import { UserAdsService } from '../../Services/user-ads.service';
@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.css']
})
export class UserAdsComponent {
  categories: { value: string; label: string; icon: string; ads: number; }[] = [];
  userAds: any[] = []; // Array to store user's ads
  searchText: string = '';
  selectedCategory: string = '';
  filteredAds: any[] = [];
  adsSubscription: Subscription | undefined;

  constructor(private advertisementService: UserAdsService , private categoryService: CategoriesService) { }
  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.adsSubscription = this.advertisementService.getAdvertisementsForCurrentUser().subscribe(
      (ads: any[]) => {
        this.userAds = ads;
         this.filterAds(); // Initial filtering
        console.log('User Ads:', this.userAds); // Log userAds array to the console
      },
      error => {
        console.error('Error fetching user ads:', error);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from the adsSubscription to prevent memory leaks
    if (this.adsSubscription) {
      this.adsSubscription.unsubscribe();
    }
  }
  filterByCategory(): void {
    this.filterAds();
  }

private filterAds(): void {
  if (!this.selectedCategory || this.selectedCategory === 'All Categories') {
    this.filteredAds = this.userAds; // No category selected, show all ads
  } else {
    this.filteredAds = this.userAds.filter(ad =>ad.Category === this.selectedCategory);
  }
}
  // Other methods for interacting with ads
  toggleDropdown(ad: any, show: boolean) {
    ad.showDropdown = show;
  }

  editAd(ad: any) {
    console.log('Editing ad:', ad.title);
  }

  viewDetails(ad: any) {
    console.log('Viewing details for:', ad.title);
  }

  makeExpire(ad: any) {
    console.log('Making ad expire:', ad.title);
  }

  deleteAd(ad: any) {
    console.log('Deleting ad:', ad.title);
  }
}
