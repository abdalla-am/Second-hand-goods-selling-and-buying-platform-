import { Component, OnDestroy } from '@angular/core';
import { UserAdsService } from '../../Services/user-ads.service';
import { CategoriesService } from '../../Services/categories.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrls: ['./user-ads.component.css']
})
export class UserAdsComponent implements OnDestroy {
  categories: { value: string; label: string; icon: string; ads: number; }[] = [];
  userAds: any[] = [];
  searchText: string = '';
  selectedCategory: string = '';
  filteredAds: any[] = [];
  adsSubscription: Subscription | undefined;
  pageSize: number = 10;
  currentPage: number = 1;
  totalItems: number = 0;

  constructor(private advertisementService: UserAdsService, private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.adsSubscription = this.advertisementService.getAdvertisementsForCurrentUser().subscribe(
      (ads: any[]) => {
        this.userAds = ads;
        this.totalItems = this.userAds.length;
        this.filterAds();
        console.log('User Ads:', this.userAds);
      },
      error => {
        console.error('Error fetching user ads:', error);
      }
    );
  }

  ngOnDestroy(): void {
    if (this.adsSubscription) {
      this.adsSubscription.unsubscribe();
    }
  }

  filterByCategory(): void {
    this.currentPage = 1;
    this.filterAds();
  }

 filterAds(): void {

    if (!this.selectedCategory || this.selectedCategory === 'All Categories') {
      this.filteredAds = this.userAds;
    } else {
      this.filteredAds = this.userAds.filter(ad => ad.Category === this.selectedCategory);
    }

    //for search bar :
    if (this.searchText) {
      const searchTextLower = this.searchText.toLowerCase();
      // this.filteredAds = this.filteredAds.filter((ad) =>
      //   ad.title.toLowerCase().includes(searchTextLower)
      this.filteredAds = this.filteredAds.filter((ad) =>
        ad.title.toLowerCase().startsWith(searchTextLower)
      );
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    if (this.currentPage < totalPages) {
      this.currentPage++;
    }
  }

  setPage(page: number): void {
    if (page >= 1 && page <= Math.ceil(this.totalItems / this.pageSize)) {
      this.currentPage = page;
    }
  }

  totalPagesArray(): number[] {
    const totalPages = Math.ceil(this.totalItems / this.pageSize);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getCurrentPageAds(): any[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.filteredAds.slice(startIndex, endIndex);
  }
  get totalPages(): number {
    return Math.ceil(Object.values(this.filteredAds).length / this.pageSize);
  }
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
