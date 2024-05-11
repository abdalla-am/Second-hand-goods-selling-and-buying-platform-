import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';
import { getDatabase, ref, onValue } from "firebase/database";
import { User, getAuth } from "firebase/auth";

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
}
