import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvertisementService } from '../../Services/advertisement.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../Services/categories.service';
import { SearchComponent } from '../search/search.component';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  @ViewChild(SearchComponent) searchComponent: SearchComponent | undefined;
  ads: any[] = [];
  filteredAds: any[] = [];
  pagedAds: any[] = [];
  selectedCategory: string = '';
  currentPage: number = 1;
  pageSize: number = 12;
  showSidebar: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private adService: AdvertisementService,
    private categoryService: CategoriesService,
    private searchService: SearchService
  ) { }

  ngOnInit(): void {
    this.adService.getAdvertisements().subscribe(data => {
      if (typeof data === 'object' && data !== null) {
        this.ads = Object.values(data);
        this.route.params.subscribe((params: { [x: string]: any; }) => {
          const categoryFromUrl = params['category'];
          if (categoryFromUrl) {
            this.selectedCategory = categoryFromUrl.toLowerCase();
            if (this.selectedCategory !== 'all') {
              this.filterAdsByCategory();
              this.showSidebar = true;
            } else {
              this.filteredAds = [...this.ads];
              this.showSidebar = true;
            }
          } else {
            this.selectedCategory = '';
            this.filteredAds = [...this.ads];
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
      // If search results are available, filter the advertisements
      if (searchResults.length > 0) {
        this.filteredAds = this.ads.filter(ad => this.containsSearchTerm(ad, searchResults));
      } else {
        // If search results are empty, show all advertisements
        this.filteredAds = [...this.ads];
      }
      this.setPage(1);
    });
  }

  // Function to check if an advertisement contains the search term
  containsSearchTerm(ad: any, searchResults: any[]): boolean {
    // Check if any of the advertisement properties contain the search term
    return Object.values(ad).some(value => {
      if (typeof value === 'string') {
        return searchResults.some(term => value.toLowerCase().includes(term.toLowerCase()));
      }
      return false;
    });
  }

  // Function to handle filter changes emitted from FiltersSidebarComponent
  onFiltersChanged(filters: any): void {
    this.adService.getAdvertisementsBySidebarFilters(filters).subscribe(filteredAds => {
      this.filteredAds = Object.values(filteredAds);
      this.setPage(1);
    });
  }
  
  filterAdsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredAds = this.ads.filter(ad => this.categoryService.getCategory(ad.Category) === this.selectedCategory);
    } else {
      this.filteredAds = [...this.ads];
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
    ad.favorite = !ad.favorite;
  }

  previousPage(): void {
    this.setPage(this.currentPage - 1);
  }

  nextPage(): void {
    this.setPage(this.currentPage + 1);
  }

  get pages(): number[] {
    const pageCount = Math.ceil(this.filteredAds.length / this.pageSize);
    return Array(pageCount).fill(0).map((x, i) => i + 1);
  }

  get totalPages(): number {
    return Math.ceil(this.filteredAds.length / this.pageSize);
  }
}
