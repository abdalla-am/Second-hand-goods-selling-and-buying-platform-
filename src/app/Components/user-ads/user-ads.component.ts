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

  constructor(private advertisementService: UserAdsService) { }

  ngOnInit(): void {
    this.adsSubscription = this.advertisementService.getAdvertisementsForCurrentUser().subscribe(
      ads => {
        this.userAds = ads ? Object.values(ads) : [];
      },
      error => {
        console.error('Error fetching advertisements:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.adsSubscription) {
      this.adsSubscription.unsubscribe();
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
