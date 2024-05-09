import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import{ AngularFireAuth } from '@angular/fire/compat/auth'
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AutheroizedUserService {

  constructor(private fireauth : AngularFireAuth, private router:Router) { }

  // login method
  login(email : string, password : string) {
    this.fireauth.signInWithEmailAndPassword(email,password).then( res => {
        localStorage.setItem('token','true');
        this.router.navigate(['']);

    }, err => {
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
