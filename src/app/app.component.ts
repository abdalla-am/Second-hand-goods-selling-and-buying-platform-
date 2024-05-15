import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AutheroizedUserService } from './Services/autheroized-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SecondHandPlatform';
  showBreadcrumbAndSidebar: boolean = true;
  isLoading: boolean = true;

  constructor(private router: Router, private authService: AutheroizedUserService) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the route is authenticated
        const authenticatedRoutes = ['/Favourites', '/Dashboard', '/EditProfile', '/NewPost', '/MyAds', '/Messages' , '/FeedBack'];
        const isRouteAuthenticated = authenticatedRoutes.some(route => event.urlAfterRedirects.includes(route));

        if (isRouteAuthenticated) {
          // Check if the user is logged in
          const isLoggedIn = this.authService.isLoggedIn();

          if (!isLoggedIn) {
            // Navigate to login page if not logged in
            this.router.navigate(['/Login']);
          } else {
            this.showBreadcrumbAndSidebar = true;
          }
        } else {
          this.showBreadcrumbAndSidebar = false;
        }
      }
    });
  }
}
