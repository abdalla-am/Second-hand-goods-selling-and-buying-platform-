import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AutheroizedUserService {
  private loggedInUserSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loggedInUser$: Observable<boolean> = this.loggedInUserSubject.asObservable();
  private currentUser: firebase.User | null = null;

  constructor(private fireauth: AngularFireAuth, private router: Router) {
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
        // Navigate to the home page first
        this.router.navigate(['/']);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      alert("Something went wrong");
      this.router.navigate(['/Login']);
    }
  }
    
  async register(email: string, password: string): Promise<void> {
    try {
      const res = await this.fireauth.createUserWithEmailAndPassword(email, password);
      if (res.user) {
        const userID = res.user.uid;
        // Store the userID in localStorage
        localStorage.setItem('userID', userID);
        alert('Registration Successful');
        this.router.navigate(['/Login']);
      }
    } catch (err: any) {
      console.error('Registration error:', err);
      alert("Something went wrong");
      this.router.navigate(['/register']);
    }
  }
  
  async logout(): Promise<void> {
    try {
      await this.fireauth.signOut();
      localStorage.removeItem('userID');
      this.router.navigate(['/login']);
    } catch (err: any) {
      console.error('Logout error:', err);
      alert(err.message);
    }
  }

  isLoggedIn(): boolean {
    return !!this.currentUser;
  }

  getLoggedInUserID(): string | null {
    return this.currentUser ? this.currentUser.uid : null;
  }
}
