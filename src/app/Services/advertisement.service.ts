import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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
}
