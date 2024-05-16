import { Component, OnInit, OnChanges } from '@angular/core';
import { AdvertisementService } from '../../Services/advertisement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../../Services/categories.service';
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../../Services/search.service';
import { UsersService } from '../../Services/users.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { GovernorateService } from '../../Services/governorate.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit, OnChanges {
  ads: { [id: string]: any } = {}; // Map IDs to ads
  pagedAds: any[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  pageSize: number = 12;
  showSidebar: boolean = false;
  filteredAds: any[] = [];
  searchText: string = '';
  minPrice: number | undefined;
  maxPrice: number | undefined;
  selectedGovernorate: string | undefined;
  conditions: string[] = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  selectedConditions: string[] = []; 
  government: any;
  Allusers : any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adService: AdvertisementService,
    private categoryService: CategoriesService,
    private searchService: SearchService,
    private userService: UsersService,
    private auth: AutheroizedUserService,
    private governmentservice : GovernorateService
  ) { }

  ngOnInit(): void {
    this.Allusers = this.userService.getAllUsersData();
    this.government = this.governmentservice.getGovernorates();
    // Fetch advertisements
    this.adService.getAdvertisements().subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        Object.keys(data).forEach(adId => {
          const ad = data[adId];
          ad.id = adId;
          this.ads[adId] = ad;
        });
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

    // Subscribe to search results
    this.searchService.searchResults$.subscribe(searchResults => {
      if (searchResults.length > 0) {
        this.ngOnChanges();
      } else {
        this.filteredAds = Object.values(this.ads);
      }
      this.setPage(1);
    });
  }
    // Method to navigate to ad details page
    goToAdDetails(adId: string): void {
      this.router.navigate(['/ad', adId]); // Navigate to '/ad/:id' route
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

  onFiltersChanged(filters: { 
    minPrice: number | undefined, 
    maxPrice: number | undefined, 
    selectedConditions: string[],
    selectedGovernorate: string | undefined
  }): void {
    const { minPrice, maxPrice, selectedConditions, selectedGovernorate } = filters;
    console.log(filters);
    
    this.filteredAds = Object.values(this.pagedAds).filter(ad => {
      return (selectedConditions.length === 0 || selectedConditions.includes(ad.condition));
    });
  
    if (minPrice !== undefined && maxPrice !== undefined) {
      this.filteredAds = this.filteredAds.filter(ad => {
        return ad.price >= minPrice && ad.price <= maxPrice;
      });
    }
  
    this.setPage(1);
  }
  clearFilters(): void {
    // Clear filter fields
    this.searchText = '';
    this.minPrice = undefined;
    this.maxPrice = undefined;
    this.selectedConditions = [];
    this.selectedGovernorate = undefined;
  
    // Reset filtered ads to all ads
    this.filterAdsByCategory();
    // Reset pagination to first page
    this.setPage(1);
  }
  
  isChecked(condition: string): boolean {
    return this.selectedConditions.includes(condition);
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
  }

  toggleFavorite(ad: any): void {
    if (!ad || !ad.id) {
      alert("Invalid advertisement:" + ad.id);
      console.error("Invalid advertisement:", ad);
      return;
    }

    const adId = ad.id;
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
        if (!isAdFavorite) {
          // Add ad to favorites if it's not already there
          favoriteItems.push(adId);
        } else {
          // Remove ad from favorites if it's already there
          const index = favoriteItems.indexOf(adId);
          if (index !== -1) {
            favoriteItems.splice(index, 1);
          }
        }

        // Update the favorite list
        this.userService.updateFavouriteList(userId, favoriteItems).subscribe(
          () => {
            console.log("Favorite list updated successfully.");
          },
          error => {
            console.error("Error updating favorite list:", error);
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
