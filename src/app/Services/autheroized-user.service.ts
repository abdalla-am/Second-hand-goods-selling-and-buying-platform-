import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

//import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider} from '@angular/fire/auth'
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
        this.router.navigate(['/login-page']);
    })
  }

}
