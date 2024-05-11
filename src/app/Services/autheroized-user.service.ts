import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import{ AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AutheroizedUserService {
  private currentUser: firebase.User | null = null;

  constructor(
    private fireauth: AngularFireAuth,
    private router: Router,
    private userService: UsersService
  ) {
    this.fireauth.authState.subscribe(user => {
      this.currentUser = user;
    });
  }

  async login(email: string, password: string): Promise<void> {
    try {
      const res = await this.fireauth.signInWithEmailAndPassword(email, password);
      const userID = this.getLoggedInUserID();
      if (userID) {
        localStorage.setItem('userID', userID);
        alert(userID);
        this.router.navigate(['/']);
      }
    } catch (err: any) {
      console.error('Login error:', err);
        alert("Something went wrong");
        this.router.navigate(['/Login']);
    })
  }


  //register method 
  register(email : string, password : string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then( res => {
      alert('Registration Successful');
      this.router.navigate(['/Login']);
    }, err => {
      alert("Something went wrong");
      this.router.navigate(['/register']);
    })
  }

  //logout method
  // logout() {
  //   this.fireauth.signOut().then( () => {
  //     localStorage.removeItem('token');
  //     this.router.navigate(['/login']);
  //   }, err => {
  //     alert(err.message);
  //   })
  // }

}
