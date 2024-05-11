import { Component } from '@angular/core';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
import { Router } from '@angular/router';
import { UsersService } from '../../Services/users.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AutheroizedUserService , private user : UsersService) {} // Inject Router and AuthorizedUserService

  navigateToDashboard() {
    if (this.authService.isLoggedIn()) { // Check if user is authorized
      this.router.navigateByUrl('/Dashboard'); // Navigate to Dashboard if authorized
    }
  }
}
