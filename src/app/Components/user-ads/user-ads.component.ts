import { Component, OnDestroy } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../Services/categories.service';
import { AdvertisementService } from '../../Services/advertisement.service';
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
