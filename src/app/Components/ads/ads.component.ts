import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../Services/advertisement.service';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService } from '../../Services/categories.service';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
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
    private categotyService : CategoriesService
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
              this.showSidebar = true; // Show sidebar if a category is selected
            } else {
              this.filteredAds = [...this.ads];
              this.showSidebar = true; // Always show the sidebar when 'all' category is selected
            }
          } else {
            this.selectedCategory = '';
            this.filteredAds = [...this.ads];
            this.showSidebar = false; // Hide sidebar if no category is selected
          }
          this.setPage(1);
        });
      } else {
        console.error('Data returned by getAdvertisements is not an object or is null:', data);
      }
    }, error => {
      console.error('Error fetching advertisements:', error);
    });
  }

  // Function to handle filter changes emitted from FiltersSidebarComponent
  onFiltersChanged(filters: any): void {
    this.adService.getAdvertisementsBySidebarFilters(filters).subscribe(filteredAds => {
      this.filteredAds = Object.values(filteredAds);
      this.setPage(1); // Update pagination when filters change
    });
  }
  
  filterAdsByCategory(): void {
    if (this.selectedCategory) {
      this.filteredAds = this.ads.filter(ad => this.categotyService.getCategory(ad.Category) === this.selectedCategory);
    } else {
      this.filteredAds = [...this.ads];
    }
  }
  setPage(page: number) {
    if (page < 1 || page > this.totalPages) {
      return;
    }
    this.currentPage = page;
    const startIndex = (page - 1) * this.pageSize;
    const endIndex = Math.min(startIndex + this.pageSize, this.filteredAds.length);
    this.pagedAds = this.filteredAds.slice(startIndex, endIndex);
  }
  toggleFavorite(ad: any) {
    ad.favorite = !ad.favorite;
  }
  previousPage() {
    this.setPage(this.currentPage - 1);
  }

  nextPage() {
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
