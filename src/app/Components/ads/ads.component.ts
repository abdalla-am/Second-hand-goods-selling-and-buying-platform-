import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { AdvertisementService } from '../../Services/advertisement.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../Services/categories.service';
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../../Services/search.service';
import { UsersService } from '../../Services/users.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, OnChanges {
  @ViewChild(SearchComponent) searchComponent: SearchComponent | undefined;
  ads: { [id: string]: any } = {}; // Map IDs to ads
  pagedAds: any[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  pageSize: number = 12;
  showSidebar: boolean = false;
  favoriteItems: any[] = [];
  isFavoriteBeingToggled: boolean | undefined;
  filteredAds: any[] = [];
  searchText: string = '';

  constructor(
    private route: ActivatedRoute,
    private adService: AdvertisementService,
    private categoryService: CategoriesService,
    private searchService: SearchService,
    private userService: UsersService,
    private auth: AutheroizedUserService
  ) { }

  ngOnInit(): void {
    this.adService.getAdvertisements().subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        this.ads = data;
        const adIds = Object.keys(data);
        this.route.params.subscribe((params: { [x: string]: any; }) => {
          const categoryFromUrl = params['category'];
          if (categoryFromUrl) {
            this.selectedCategory = categoryFromUrl.toLowerCase();
            if (this.selectedCategory !== 'all') {
              this.filterAdsByCategory();
              this.showSidebar = true;
            } else {
              this.filteredAds = Object.values(data);
              this.showSidebar = true;
            }
          } else {
            this.selectedCategory = '';
            this.filteredAds = Object.values(data);
            this.showSidebar = false;
          }
          this.setPage(1);
        });
      } else {
        console.error('Data returned by getAdvertisements is not an object or is null:', data);
      }
    }, error => {
      console.error('Error fetching advertisements:', error);
    });

    this.searchService.searchResults$.subscribe(searchResults => {
      if (searchResults.length > 0) {
        this.ngOnChanges();
      } else {
        this.filteredAds = Object.values(this.ads);
      }
      this.setPage(1);
    });
  }

  ngOnChanges(): void {
    const searchTextLower = this.searchText.toLowerCase();
    if (this.searchText) {
      this.filteredAds = Object.values(this.ads).filter(ad => ad.title.toLowerCase().startsWith(searchTextLower));
      if (this.filteredAds.length === 0) {
        this.filteredAds = [];
        alert('No ads found with the search term: ' + this.searchText);
      }
    } else {
      this.filteredAds = Object.values(this.ads);
    }
    this.setPage(1);
  }

  onFiltersChanged(filters: any): void {
    this.adService.getAdvertisementsBySidebarFilters(filters).subscribe(filteredAds => {
      this.filteredAds = Object.values(filteredAds);
      this.setPage(1);
    });
  }

  filterAdsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredAds = Object.values(this.ads).filter(ad => this.categoryService.getCategory(ad.Category) === this.selectedCategory);
    } else {
      this.filteredAds = Object.values(this.ads);
    }
  }

  setPage(page: number): void {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredAds.length);
    this.pagedAds = this.filteredAds.slice(startIndex, endIndex);
    this.pagedAds = Object.keys(this.ads).slice(startIndex, endIndex).map(id => ({ id, ...this.ads[id] }));
  }

  toggleFavorite(ad: any): void {
    if (!ad || !ad.id) {
      alert("Invalid advertisement:" + ad.id);
      console.error("Invalid advertisement:", ad);
      return;
    }

    const adId = ad.id;
    alert(adId);
    console.log("Toggling favorite for advertisement ID:", adId);
    ad.favorite = !ad.favorite;
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) {
      console.error("Current user not found.");
      return;
    }
    const userId = currentUser.uid; // Get the current user's ID

    this.userService.getFavouriteList(userId).subscribe(
      favorites => {
        const favoriteItems: string[] = favorites || []; // Initialize favorites as empty array if null

        // Check if the ad is already in the favorites list
        const isAdFavorite = favoriteItems.includes(adId);

        // Toggle the favorite status only if there's a change
        if (!isAdFavorite && !this.isFavoriteBeingToggled) {
          this.isFavoriteBeingToggled = true; // Prevent recursive call
          // Add ad to favorites if it's not already there
          console.log("Adding advertisement to favorites:", adId);
          favoriteItems.push(adId);
        } else if (isAdFavorite && !this.isFavoriteBeingToggled) {
          this.isFavoriteBeingToggled = true; // Prevent recursive call
          // Remove ad from favorites if it's already there
          console.log("Removing advertisement from favorites:", adId);
          const index = favoriteItems.indexOf(adId);
          if (index !== -1) {
            favoriteItems.splice(index, 1);
          }
        }

        // Update the favorite list
        this.userService.updateFavouriteList(userId, favoriteItems).subscribe(
          () => {
            console.log("Favorite list updated successfully.");
            this.isFavoriteBeingToggled = false; // Reset the flag
          },
          error => {
            console.error("Error updating favorite list:", error);
            this.isFavoriteBeingToggled = false; // Reset the flag in case of error
          }
        );
      },
      error => {
        console.error("Error fetching favorite list:", error);
      }
    );
  }

  previousPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  get pages(): number[] {
    const pageCount = Math.ceil(Object.values(this.filteredAds).length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(Object.values(this.filteredAds).length / this.pageSize);
  }
}
