import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { UserAdsService } from '../../Services/user-ads.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { UsersService } from '../../Services/users.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  styleUrls: ['./favourites.component.css']
})
export class FavouritesComponent implements OnInit {
  categories: { value: string; label: string; icon: string; }[] = [];
  favourites: { id: string, data: any }[] = [];
  currentPage: number = 1;
  pageSize: number = 10;
  isFavoriteBeingToggled: boolean = false;
  displayedAds: any[] = [];
  totalPages: number = 0;
  selectedCategory: string = '';
  filteredAds: any[] = [];
  searchText: any;

  constructor(
    private categoryService: CategoriesService,
    private userAdsService: UserAdsService,
    private auth: AutheroizedUserService,
    private userService: UsersService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.loadFavourites();
  }
  loadFavourites(): void {
    this.userAdsService.getAdvertisementsForCurrentUserFavorites().subscribe(ads => {
      this.favourites = ads.map((ad: any) => ({ id: ad.id, data: ad }));
      this.updateDisplayedAds();
      this.filterAds();
    });
  }

  updateDisplayedAds(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredAds = this.favourites.slice(startIndex, endIndex).map(fav => fav.data);
    alert(this.filteredAds.length);
    this.totalPages = Math.ceil(this.favourites.length / this.pageSize);
  }
  filterByCategory(): void {
    this.currentPage = 1;
    this.filterAds();
    this.updateDisplayedAds();
  }

  private filterAds(): void {
    if (!this.selectedCategory || this.selectedCategory === 'All Categories') {
      this.filteredAds = this.filteredAds;
      alert(this.filteredAds.length);
    } else {
      this.filteredAds = this.filteredAds.filter(ad => ad.Category === this.selectedCategory);
    }
  }

  toggleFavorite(ad: any): void {
    if (!ad || !ad.id) {
      console.error("Invalid advertisement:", ad);
      return;
    }
    const adId = ad.id;
    console.log("Toggling favorite for advertisement ID:", adId);
    ad.favorite = !ad.favorite;
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }
  
    const userId = currentUser.uid;
    this.userService.getFavouriteList(userId).pipe(
      switchMap(favorites => {
        const favoriteItems: string[] = favorites || [];
        const isAdFavorite = favoriteItems.includes(adId);
  
        if (!isAdFavorite && !this.isFavoriteBeingToggled) {
          this.isFavoriteBeingToggled = true;
          favoriteItems.push(adId);
        } else if (isAdFavorite && !this.isFavoriteBeingToggled) {
          this.isFavoriteBeingToggled = true;
          const index = favoriteItems.indexOf(adId);
          if (index !== -1) {
            favoriteItems.splice(index, 1);
          }
        }
  
        return this.userService.updateFavouriteList(userId, favoriteItems);
      }),
      switchMap(() => this.userAdsService.getAdvertisementsForCurrentUserFavorites())
    ).subscribe(
      ads => {
        this.favourites = ads.map(ad => ({ id: ad.id, data: ad }));
        this.filteredAds = this.favourites;
        this.updateDisplayedAds();
        this.filterAds();
        console.log("Favorite list updated successfully.");
        this.isFavoriteBeingToggled = false;
      },
      error => {
        console.error("Error updating favorite list:", error);
        this.isFavoriteBeingToggled = false;
      }
    );
  }
  
  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayedAds();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayedAds();
    }
  }

  setPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updateDisplayedAds();
    }
  }

  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}
