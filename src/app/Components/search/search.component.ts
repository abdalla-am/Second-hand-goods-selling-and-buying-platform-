import { Component } from '@angular/core';
import { AdvertisementService } from '../../Services/advertisement.service';
import { SearchService } from '../../Services/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {

  searchKeyword: string = '';
  searchResults: any[] = [];

  constructor(private advertisementService: AdvertisementService , private searchService: SearchService) { }

  ngOnInit(): void {
  }

  search(): void {
    if (this.searchKeyword.trim() !== '') {
      this.advertisementService.searchAdvertisements(this.searchKeyword.trim()).subscribe(
        (data: any) => {
          this.searchResults = Object.values(data); // Assuming data is an object, convert to array of values
          this.searchService.setSearchResults(this.searchResults); // Set search results in the service
        },
        (error: any) => {
          console.error('Error fetching search results:', error);
          this.searchResults = []; // Clear search results in case of error
          this.searchService.setSearchResults(this.searchResults); // Set empty search results in the service
        }
      );
    } else {
      this.searchResults = []; // Clear search results if search keyword is empty
      this.searchService.setSearchResults(this.searchResults); // Set empty search results in the service
    }
  }
}
