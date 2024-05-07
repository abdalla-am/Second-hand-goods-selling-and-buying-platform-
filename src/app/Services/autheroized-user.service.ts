import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AutheroizedUserService {
  private isLoggedInVar: boolean = true;
  constructor() { }

  // Simulate login functionality
  login() {
    // Perform authentication logic
    // For demonstration purposes, just set isLoggedInVar to true
    this.isLoggedInVar = true;
  }

  // Simulate logout functionality
  logout() {
    // Perform logout logic
    // For demonstration purposes, just set isLoggedInVar to false
    this.isLoggedInVar = false;
  }

  // Check if user is logged in
  isLoggedIn(): boolean {
    return this.isLoggedInVar;
  }
}
