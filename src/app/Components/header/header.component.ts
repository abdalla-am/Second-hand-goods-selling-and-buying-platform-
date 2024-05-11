import { Component, OnInit } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; // Initialize authentication status
  isProfileMenuVisible: boolean = false;

  constructor(private router: Router, private authService: AutheroizedUserService, private user: UsersService) {}

  ngOnInit() {
    // Subscribe to loggedInUser$ observable to get updates on authentication status
    this.authService.loggedInUser$.subscribe((isLoggedIn: boolean) => {
      this.isAuthenticated = isLoggedIn; // Update authentication status
    });

    // Subscribe to logout event
    this.authService.logoutEvent$.subscribe(() => {
      this.isAuthenticated = false; // Set isAuthenticated to false when logout occurs
    });
  }
  showProfileMenu() {
    this.isProfileMenuVisible = true;
  }

  hideProfileMenu() {
    this.isProfileMenuVisible = false;
  }

  navigateToDashboard() {
    if (this.isAuthenticated) { // Check if user is authorized
      this.router.navigateByUrl('/Dashboard'); // Navigate to Dashboard if authorized
    }
  }
  logout() {
    // Call the logout method from the authentication service
    this.authService.logout();
  }

}
