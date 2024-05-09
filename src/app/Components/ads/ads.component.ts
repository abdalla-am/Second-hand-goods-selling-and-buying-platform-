import { Component, OnInit } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { AdsListService } from '../../Services/ads-list.service';
import { Ads } from '../../Interfaces/ads';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ads',
  templateUrl: './ads.component.html',
  styleUrls: ['./ads.component.css']
})
export class AdsComponent implements OnInit {
  categories: any;
  ads: Ads[] = [];
  filteredAds: Ads[] = [];
  pagedAds: Ads[] = []; // Added property for paged ads
  selectedCategory: string = '';
  showSidebar: boolean = false;
  currentPage: number = 1; // Added property for current page
  pageSize: number = 12; // Added property for number of ads per page

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoriesService,
    private adService: AdsListService
  ) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    this.ads = this.adService.getAllAds();
    
    this.route.params.subscribe((params: { [x: string]: any; }) => {
      const categoryFromUrl = params['category'];
      if (categoryFromUrl) {
        this.selectedCategory = categoryFromUrl;
        this.filterAdsByCategory(categoryFromUrl);
        this.showSidebar = true;
      } else {
        this.selectedCategory = 'All';
        this.filteredAds = [...this.ads];
        this.showSidebar = false;
      }
      this.setPage(1); // Set initial page
    });
  }

  filterAdsByCategory(category: string): void {
    const lowerCaseCategory = category.toLowerCase();
    if (lowerCaseCategory === 'all') {
      this.filteredAds = [...this.ads];
    } else {
      this.filteredAds = this.ads.filter(ad => ad.category.toLowerCase() === lowerCaseCategory);
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
