import { Component } from '@angular/core';

@Component({
  selector: 'app-user-ads',
  templateUrl: './user-ads.component.html',
  styleUrl: './user-ads.component.css'
})
export class UserAdsComponent {
  MyAdscategories = [
    { value: 'all', label: 'All Categories', icon: 'fas fa-th-large' },
    { value: 'mobiles', label: 'Mobiles', icon: 'fas fa-mobile-alt' },
    { value: 'electronics', label: 'Electronics', icon: 'fas fa-laptop' },
    { value: 'vehicles', label: 'Vehicles', icon: 'fas fa-car' },
    { value: 'properties', label: 'Properties', icon: 'fas fa-home' },
    { value: 'essentials', label: 'Essentials', icon: 'fas fa-shopping-cart' },
    { value: 'home-living', label: 'Home & Living', icon: 'fas fa-couch' },
    { value: 'business', label: 'Business Industry', icon: 'fas fa-briefcase' },
    { value: 'education', label: 'Education', icon: 'fas fa-graduation-cap' },
    { value: 'books', label: 'Books', icon: 'fas fa-book' },
    { value: 'fitness', label: 'Fitness', icon: 'fas fa-dumbbell' },
    { value: 'animals-pets', label: 'Animals & Pets', icon: 'fas fa-paw' }
  ];
  ads = [
    { title: 'Ad 1', date: '2024-05-01', price: '$50', status: 'Active', showDropdown: false },
    { title: 'Ad 2', date: '2024-05-02', price: '$70', status: 'Inactive', showDropdown: false },
    { title: 'Ad 3', date: '2024-05-03', price: '$60', status: 'Active', showDropdown: false }
  ];
  toggleDropdown(ad: any, show: boolean) {
    ad.showDropdown = show;
  }

  editAd(ad: any) {
    // Implement edit ad action
    console.log('Editing ad:', ad.title);
  }

  viewDetails(ad: any) {
    // Implement view details action
    console.log('Viewing details for:', ad.title);
  }

  makeExpire(ad: any) {
    // Implement make expire action
    console.log('Making ad expire:', ad.title);
  }

  deleteAd(ad: any) {
    // Implement delete ad action
    console.log('Deleting ad:', ad.title);
  }

}
