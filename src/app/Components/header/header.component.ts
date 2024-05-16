import { Component, OnInit } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { Router } from '@angular/router';
import { NotificationServiceService } from '../../Services/notification-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthenticated: boolean = false; // Initialize authentication status
  isProfileMenuVisible: boolean = false;
  isNotificationVisible: boolean = false;

  constructor(private router: Router, 
    private authService: AutheroizedUserService, 
    private notificationService: NotificationServiceService) {}

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
  showNotification() {
    this.isNotificationVisible = true;
    this.notificationService.showNotificationPopup();
  }

  hideNotification() {
    this.isNotificationVisible = false;
    this.notificationService.hideNotificationPopup();
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