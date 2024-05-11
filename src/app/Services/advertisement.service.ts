import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private baseUrl = 'https://second-hand-sellingandbuying-default-rtdb.firebaseio.com';
  private adsEndpoint = 'ads.json'; // Assuming '.json' extension for Firebase Realtime Database

  constructor(private http: HttpClient) { }

  getAdvertisements(): Observable<any> {
    const url = `${this.baseUrl}/${this.adsEndpoint}`;
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
  getAdvertisementsByUser(userID: string): Observable<any[]> {
    alert(userID);
    const url = `${this.baseUrl}/${this.adsEndpoint}?orderBy="authorID"&equalTo="${userID}"`;
    alert(url);
    return this.http.get<any[]>(url);
  }
}
