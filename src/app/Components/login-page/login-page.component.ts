import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router'; // Import Router
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
 //added by Abdalla



@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{
  
  email:string='';
  password:string='';
  loginErrorFounded: boolean | undefined;

  constructor(private auth: AutheroizedUserService) { }

  ngOnInit(): void {
  }

  login() {
    if(this.email === '') {
      alert('Please enter email');
      return;
    }

    if(this.password === '') {
      alert('Please enter password');
      return;
    }
    this.loginErrorFounded = this.auth.loginError;
    this.auth.login(this.email, this.password);
    this.email = '';
    this.password = '';
  }

  // Function to clear login error flag when the user starts typing again
  clearLoginError() {
    this.loginErrorFounded = false;
  }
}