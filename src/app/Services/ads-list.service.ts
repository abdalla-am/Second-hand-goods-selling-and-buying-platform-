import { Injectable } from '@angular/core';
import { Ads } from '../Interfaces/ads';

@Injectable({
  providedIn: 'root'
})
export class AdsListService {
  getAdsByCategory(category: string) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
  ads: Ads[] = [
    {
      id: 1,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Stylish Sneakers',
      category: 'Education',
      userId: 1,
      price: 49.99
    },
    {
      id: 2,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Cozy Home Throw Blanket',
      category: 'Mobiles',
      userId: 1,
      price: 29.99
    },
    {
      id: 3,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Stylish Sneakers',
      category: 'Essentials',
      userId: 2,
      price: 49.99
    },
    {
      id: 4,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Cozy Home Throw Blanket',
      category: 'Mobiles',
      userId: 2,
      price: 29.99
    },
    {
      id: 5,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Stylish Sneakers',
      category: 'Vehicles',
      userId: 3,
      price: 49.99
    },
    {
      id: 6,
      imageUrl: '../../../assets/Login/image 1.png',
      name: 'Cozy Home Throw Blanket',
      category: 'Essentials',
      userId: 3,
      price: 29.99
    },
    {
      "id": 7,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Latest Smartphone Model",
      "category": "Vehicles",
      "userId": 4,
      "price": 699.99
  },
  {
      "id": 8,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Smart LED TV",
      "category": "Electronics",
      "userId": 5,
      "price": 799.99
  },
  {
      "id": 9,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "iPhone 13 Pro",
      "category": "Mobile",
      "userId": 6,
      "price": 1099.99
  },
  {
      "id": 10,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Toyota Camry",
      "category": "Vehicles",
      "userId": 7,
      "price": 25000.00
  },
  {
      "id": 11,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Spacious Villa",
      "category": "Properties",
      "userId": 8,
      "price": 500000.00
  },
  {
      "id": 12,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Kitchen Appliances Set",
      "category": "Essentials",
      "userId": 9,
      "price": 299.99
  },
  {
      "id": 13,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Modern Sofa Set",
      "category": "Home & living",
      "userId": 10,
      "price": 999.99
  },
  {
      "id": 14,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Office Desk",
      "category": "Buisiness industry",
      "userId": 11,
      "price": 399.99
  },
  {
      "id": 15,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Language Learning Course",
      "category": "Education",
      "userId": 12,
      "price": 49.99
  },
  {
      "id": 16,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Bestseller Novel",
      "category": "books",
      "userId": 13,
      "price": 19.99
  },
  {
      "id": 17,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Yoga Mat",
      "category": "Fitness",
      "userId": 14,
      "price": 29.99
  },
  {
      "id": 18,
      "imageUrl": "../../../assets/Login/image 1.png",
      "name": "Pet Grooming Kit",
      "category": "animals & Pets",
      "userId": 15,
      "price": 39.99
  },
  ];
  getAllAds() {
    return this.ads;
  }

  getAdById(id: number) {
    return this.ads.find(ad => ad.id === id);
  }
}
