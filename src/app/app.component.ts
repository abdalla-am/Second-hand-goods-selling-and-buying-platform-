import { Component } from '@angular/core';
import { AutheroizedUserService } from './Services/autheroized-user.service';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'SecondHandPlatform';
  showBreadcrumbAndSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Check if the route is home, login, or sign up
        if (['/', '/Login', '/SignUp' , '/ForgetPassword' , '/Basic'].includes(this.router.url)) {
          this.showBreadcrumbAndSidebar = false;
        } else {
          this.showBreadcrumbAndSidebar = true;
        }
      }
    });
  }

}
