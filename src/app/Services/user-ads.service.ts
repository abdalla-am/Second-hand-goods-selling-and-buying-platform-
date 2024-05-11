import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AdvertisementService } from './advertisement.service';

@Injectable({
  providedIn: 'root'
})
export class UserAdsService {
  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private advertisementService: AdvertisementService
  ) {}

  getAdvertisementsForCurrentUser(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.advertisementService.getAdvertisementsByUser(user.uid).pipe(
            map(ads => {
              // Extract and alert the IDs of the ads
              const adIds = Object.keys(ads);
              alert('Ads IDs: ' + adIds.join(', '));
              return ads; // Return ads for further processing if needed
            })
          );
        } else {
          return [];
        }
      })
    );
  }
}
