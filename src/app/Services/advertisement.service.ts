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
  getUserAdsvetisment(userID: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ads`).pipe(
      map((ads: any[]) => {
        return ads.filter(ad => ad.authorID === userID);
      })
    );
  }
}
