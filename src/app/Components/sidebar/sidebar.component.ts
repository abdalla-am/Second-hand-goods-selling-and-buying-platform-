import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type, OnInit } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  constructor(private router: Router, private authService: AutheroizedUserService , private userService: UsersService) {} // Inject Router and AuthorizedUserService
  
  activeMenuItem: string | null = null;
  userName: string | null = null; // Variable to hold the user's name
  ngOnInit(): void {
    const auth = getAuth();
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.userService.getUserName(user.uid).subscribe((name) => {
          this.userName = name;
        });
      } else {
        // User is signed out.
        // Handle accordingly
      }
    });
  }

  selectMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
  }

  isActive(menuItem: string): boolean {
    return this.activeMenuItem === menuItem;
  }

  navigateTo(Navigatetion: string) {
    if (this.authService.isLoggedIn()) { // Check if user is authorized
      this.router.navigateByUrl('/' + Navigatetion); // Navigate to Dashboard if authorized
    }
  }
  logout() {
    this.authService.logout(); // Call the logout() method from the AutheroizedUserService
  }
}
