import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AdvertisementService } from './advertisement.service';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { UsersService } from './users.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Injectable({
  providedIn: 'root'
})
export class UserAdsService {
  constructor(
    private afAuth: AngularFireAuth,
    private advertisementService: AdvertisementService,
    private userService : UsersService,
    private db: AngularFireDatabase,
  ) {}

  // Method to get advertisements for the current user
  getAdvertisementsForCurrentUser(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // If user is authenticated, fetch advertisements for the user
          return this.advertisementService.getAdvertisementsByUser(user.uid).pipe(
            map(ads => {
              // Extract and return the advertisements
              return Object.values(ads);
            }),
            catchError(error => {
              console.error('Error fetching advertisements:', error);
              // Return an empty array in case of error
              return of([]);
            })
          );
        } else {
          alert('Not Found');
          // If user is not authenticated, return an empty array
          return of([]);
        }
      })
    );
  }
   // Method to get advertisements for the current user's favorite list
  getAdvertisementsForCurrentUserFavorites(): Observable<any[]> {
    return this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          // If user is authenticated, fetch user's favorite list
          return this.userService.getFavouriteList(user.uid).pipe(
            switchMap(favoriteIds => {
              console.log(favoriteIds);
              // For each favorite ID, fetch advertisement details
              const requests = favoriteIds.map(adId => this.advertisementService.getAdvertisementById(adId));
              // Combine all requests and return as a single observable
              return forkJoin(requests).pipe(
                map(ads => ads.filter(ad => !!ad)) // Filter out any null or undefined ads
              );
            }),
            catchError(error => {
              console.error('Error fetching user favorite advertisements:', error);
              // Return an empty array in case of error
              return of([]);
            })
          );
        } else {
          console.log('User not authenticated');
          // If user is not authenticated, return an empty array
          return of([]);
        }
      })
    );
  }

   
}
