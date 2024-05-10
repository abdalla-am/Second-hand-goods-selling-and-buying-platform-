import { Component, OnInit } from '@angular/core';
import { AdvertisementService } from '../../Services/advertisement.service';
import { ActivatedRoute } from '@angular/router';

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
  showSidebar: boolean = false;
  currentPage: number = 1;
  pageSize: number = 12;

  constructor(
    private route: ActivatedRoute,
    private adService: AdvertisementService // Inject AdvertisementService
  ) { }

  ngOnInit(): void {
    this.adService.getAdvertisements().subscribe(data => {
      if (typeof data === 'object' && data !== null) { // Check if data is an object and not null
        // Convert object to array
        this.ads = Object.values(data);
        this.route.params.subscribe((params: { [x: string]: any; }) => {
          const categoryFromUrl = params['category'];
          if (categoryFromUrl) {
            this.selectedCategory = categoryFromUrl;
            this.filterAdsByCategory([categoryFromUrl]); // Pass category as an array
            this.showSidebar = true;
          } else {
            this.selectedCategory = 'All';
            this.filteredAds = [...this.ads];
            this.showSidebar = false;
          }
          this.setPage(1); // Set initial page
        });
      } else {
        console.error('Data returned by getAdvertisements is not an object or is null:', data);
      }
    }, error => {
      console.error('Error fetching advertisements:', error);
    });
  }

  filterAdsByCategory(categories: string[]): void {
    if (categories.length === 0) {
      this.filteredAds = [...this.ads];
    } else {
      this.filteredAds = this.ads.filter(ad => categories.includes(ad.category.toLowerCase()));
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
