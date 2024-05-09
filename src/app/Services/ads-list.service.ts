import { Injectable } from '@angular/core';
import { Ads } from '../Interfaces/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsListService {

  constructor() { }
  ads: Ads[] = [
    {
      id: 1,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Stylish Sneakers',
      category: 'Fashion & Accessories',
      userId: 1,
      price: 49.99
    },
    {
      id: 2,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Cozy Home Throw Blanket',
      category: 'Home & Decor',
      userId: 1,
      price: 29.99
    },
    {
      id: 3,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Stylish Sneakers',
      category: 'Fashion & Accessories',
      userId: 2,
      price: 49.99
    },
    {
      id: 4,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Cozy Home Throw Blanket',
      category: 'Home & Decor',
      userId: 2,
      price: 29.99
    },
    {
      id: 5,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Stylish Sneakers',
      category: 'Fashion & Accessories',
      userId: 3,
      price: 49.99
    },
    {
      id: 6,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Cozy Home Throw Blanket',
      category: 'Home & Decor',
      userId: 3,
      price: 29.99
    },
  ];
  getAllAds() {
    return this.ads;
  }

  getAdById(id: number) {
    return this.ads.find(ad => ad.id === id);
  }
}
