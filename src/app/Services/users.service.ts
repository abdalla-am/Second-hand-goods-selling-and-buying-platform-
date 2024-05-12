import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { getDatabase, ref, onValue, remove } from "firebase/database";
import { User, getAuth } from "firebase/auth";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private db: AngularFireDatabase) {}

  getUserData(uid: string): Observable<any> {
    // Assuming you have a 'users' node in your database where user data is stored
    return this.db.object(`/users/${uid}`).valueChanges();
  }

  getUserName(uid: string): Observable<string> {
    return new Observable<string>((observer) => {
      const userRef = ref(getDatabase(), `/users/${uid}/full_name`);
      onValue(userRef, (snapshot) => {
        const name = snapshot.val();
        observer.next(name);
        observer.complete();
      });
    });
  }
  updateUserData(uid: string, updatedUserData: any): Observable<void> {
    const userRef = this.db.object(`/users/${uid}`);

    return new Observable<void>((observer) => {
      userRef.update(updatedUserData)
        .then(() => {
          alert('User data updated successfully');
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          console.error('Error updating user data:', error);
          observer.error(error);
        });
    }).pipe(
      catchError((error) => {
        // Log the error and rethrow it
        console.error('Error updating user data:', error);
        return throwError(error);
      })
    );
  }
  getFavouriteList(uid: string): Observable<string[]> {
    return new Observable<string[]>((observer) => {
      const favouriteListRef = ref(getDatabase(), `/users/${uid}/FavoriteList`);
      onValue(favouriteListRef, (snapshot) => {
        const favourites = snapshot.val();
        alert(favourites);
        observer.next(favourites);
        observer.complete();
      });
    });
  }
  deleteUserData(uid: string): Observable<void> {
    const userRef = this.db.object(`/users/${uid}`);

    return new Observable<void>((observer) => {
      userRef.remove()
        .then(() => {
          observer.next();
          observer.complete();
        })
        .catch((error) => {
          observer.error(error);
        });
    }).pipe(
      catchError((error) => {
        console.error('Error deleting user data:', error);
        return throwError(error);
      })
    );
  }
  
}
