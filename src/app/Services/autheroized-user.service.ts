import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, Subject, Subscription, catchError, throwError } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { UsersService } from './users.service';
import { UserData } from '../Interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AutheroizedUserService {
  private loggedInUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInUser$: Observable<boolean> = this.loggedInUserSubject.asObservable();
  private currentUser: firebase.User | null = null;
  private logoutEventSubject: Subject<void> = new Subject<void>();
  logoutEvent$: Observable<void> = this.logoutEventSubject.asObservable();
  loginError: boolean = false; // Add this property
  user$: any;
  userData: UserData | undefined;
  userDataSubscription: Subscription | undefined;

  constructor(private fireauth: AngularFireAuth, 
    private router: Router , 
    private db: AngularFireDatabase , 
    private userService : UsersService ,
    private afAuth: AngularFireAuth) {
    this.fireauth.authState.subscribe(user => {
      this.currentUser = user;
      this.loggedInUserSubject.next(!!user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const res = await this.fireauth.signInWithEmailAndPassword(email, password);
      const userID = this.getLoggedInUserID();
      if (userID) {
        localStorage.setItem('userID', userID);
        this.userDataSubscription = this.userService.getUserData(userID).subscribe(data => {
          this.userData = data;
        });
        // Navigate to the home page first
        this.router.navigate(['/']);
        this.loginError = false; // Reset loginError on successful login
      }
    } catch (err: any) {
      console.error('Login error:', err);
      this.loginError = true; // Set loginError to true on login error
      alert("Something went wrong");
      this.router.navigate(['/Login']);
    }
  }
  async register(email: string, password: string, additionalData: any): Promise<void> {
    try {
      const res = await this.fireauth.createUserWithEmailAndPassword(email, password);
      if (res.user) {
        const userID = res.user.uid;
        localStorage.setItem('userID', userID);
        await this.saveUserData(userID, { email, ...additionalData });
        this.router.navigate(['/Login']);
      } else {
        throw new Error("User registration failed");
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      alert("Something went wrong");
      this.router.navigate(['/SignUp']);
    }
  }

  private async saveUserData(userID: string, data: any): Promise<void> {
    try {
      await this.db.object(`/users/${userID}`).set(data);
    } catch (error) {
      console.error('Error saving user data:', error);
      throw error;
    }
  }


  async logout(): Promise<void> {
    try {
      await this.fireauth.signOut();
      localStorage.removeItem('userID');
      this.router.navigate(['/']);
      this.logoutEventSubject.next(); // Emit logout event
    } catch (err: any) {
      console.error('Logout error:', err);
      alert(err.message);
    }
  }
  // New method to delete user data from the database
  deleteUserData(uid: string): Observable<void> {
    return this.userService.deleteUserData(uid).pipe(
      catchError((error) => {
        console.error('Error deleting user data:', error);
        return throwError(error);
      })
    );
  }
  deleteAccount(): Promise<void> {
    return this.afAuth.currentUser.then(user => {
      if (user) {
        return user.delete();
      } else {
        throw new Error("No user signed in");
      }
    });
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getLoggedInUserID(): string | null {
    return this.currentUser ? this.currentUser.uid : null;
  }
  
  getCurrentUser(): firebase.User | null {
    return this.currentUser;
  }

  changePassword(currentPassword: string, newPassword: string): Promise<void> {
    const user = this.currentUser;
    if (user) {
      return user.updatePassword(newPassword);
    } else {
      return Promise.reject(new Error('User not authenticated'));
    }
  }

}
