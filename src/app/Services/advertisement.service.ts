import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private baseUrl = 'https://second-hand-sellingandbuying-default-rtdb.firebaseio.com';
  private adsEndpoint = 'ads.json'; // Assuming '.json' extension for Firebase Realtime Database

  constructor(private http: HttpClient , private db: AngularFireDatabase) { }

  getAdvertisements(): Observable<any> {
    const url = `${this.baseUrl}/${this.adsEndpoint}`;
    return this.http.get<any>(url);
  }
  getAdvertisementById(adId: string): Observable<any> {
    const url = `${this.baseUrl}/ads/${adId}.json`;
    return this.http.get<any>(url);
  }
  getAdvertisementsByCategory(category: string): Observable<any> {
    const url = `${this.baseUrl}/${this.adsEndpoint}?orderBy="category"&equalTo="${category}"`;
    return this.http.get<any>(url);
  }
  getAdvertisementsBySidebarFilters(filters: any): Observable<any> {
    let url = `${this.baseUrl}/${this.adsEndpoint}?`;

    // Add filters based on selected options
    if (filters.minPrice !== undefined) {
      url += `&startAt=${filters.minPrice}`;
    }
    if (filters.maxPrice !== undefined) {
      url += `&endAt=${filters.maxPrice}`;
    }
    if (filters.selectedGovernorate) {
      url += `&orderBy="location"&equalTo="${filters.selectedGovernorate}"`;
    }
    if (filters.selectedConditions && filters.selectedConditions.length > 0) {
      filters.selectedConditions.forEach((condition: any) => {
        url += `&orderBy="condition"&equalTo="${condition}"`;
      });
    }
    if (filters.selectedDates && filters.selectedDates.length > 0) {
      filters.selectedDates.forEach((_date: any) => {
        // Implement logic for filtering by upload date
      });
    }

    return this.http.get<any>(url);
  }
  getAdvertisementsByUser(userId: string): Observable<any[]> {
    const url = `${this.baseUrl}/${this.adsEndpoint}`;
    return this.http.get<any[]>(url).pipe(
      map(ads => {
        // Filter ads by authorID equal to userId
        return Object.values(ads).filter(ad => ad.authorID === userId);
      })
    );
  }
  saveAd(ad: any , uid : string) {
    // Generate a unique ID for the new ad
    const adId = this.db.createPushId();
    
    // Set up the advertisement data
    const newAd = {
      Category: ad.category,
      Date_created: ad.date_created,
      authorID: uid, // Assuming you have a user ID for the author
      condition: ad.condition,
      description: ad.description,
      price: ad.price,
      status: 'Active',
      imageURL:ad.imageURL,
      title: ad.title
    };

    // Save the new advertisement to Firebase
    return this.db.object(`ads/${adId}`).set(newAd);
  }
  searchAdvertisements(keyword: string): Observable<any> {
    const url = `${this.baseUrl}/${this.adsEndpoint}?orderBy="title"&startAt="${keyword}"&endAt="${keyword}\uf8ff"`;
    return this.http.get<any>(url);
  }
}

