import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { getDatabase, ref, onValue } from "firebase/database";
import { User, getAuth } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  database = getDatabase();
  auth = getAuth();
  currentUser$: Observable<User | null>;

  constructor(private db: AngularFireDatabase) {
    this.currentUser$ = new Observable(subscriber => {
      const unsubscribe = this.auth.onAuthStateChanged(user => {
        subscriber.next(user);
      });
      return unsubscribe;
    });
  }

  getCurrentUserID(): string | null {
    const currentUser = this.auth.currentUser;
    return currentUser ? currentUser.uid : null;
  }

  getUserDetails(uid: string): Observable<any> {
    return this.db.object(`/users/${uid}`).valueChanges();
  }
}
