import { Component } from '@angular/core';
import { BasicLayoutService } from '../../Services/basic-layout.service';
import { AutheroizedUserService } from '../../Services/autheroized-user.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  showSidebar = true;
  constructor(private basiclayoutService: BasicLayoutService , Autheroizeduserservice : AutheroizedUserService) { }
  toggleSidebar() {
    this.basiclayoutService.toggleSidebar();
  }
  HideSidebat() {
    // Call the hideSidebar method
    this.basiclayoutService.hideSidebar();
  }
}
