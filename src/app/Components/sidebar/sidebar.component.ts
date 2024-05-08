import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  activeMenuItem: string | null = null;

  selectMenuItem(menuItem: string) {
    this.activeMenuItem = menuItem;
  }

  isActive(menuItem: string): boolean {
    return this.activeMenuItem === menuItem;
  }
}
