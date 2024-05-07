import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, ComponentRef, Type } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { GeneratePostComponent } from '../generate-post/generate-post.component';
import { FavouritesComponent } from '../favourites/favourites.component';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { MessagesComponent } from '../messages/messages.component';
import { UserAdsComponent } from '../user-ads/user-ads.component';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @ViewChild('dynamicComponentContainer', { read: ViewContainerRef })
  dynamicComponentContainer!: ViewContainerRef;
  componentRef!: ComponentRef<any>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent(componentName: string) {
    // Clear previous component if any
    if (this.componentRef) {
      this.componentRef.destroy();
    }

    // Dynamically load component
    const componentType = this.getComponentType(componentName);
    const factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.componentRef = this.dynamicComponentContainer.createComponent(factory);
  }

  private getComponentType(componentName: string): Type<any> {
    switch (componentName) {
      case 'DashboardComponent':
        return DashboardComponent;
      case 'NewPostComponent':
        return GeneratePostComponent;
      case 'FavouritesComponent':
        return FavouritesComponent;
      case 'EditProfileComponent':
        return EditProfileComponent;
      case 'MessagesComponent':
        return MessagesComponent;
      case 'UserAdsComponent':
        return UserAdsComponent;
      default:
        throw new Error(`Component ${componentName} not found.`);
    }
  }
}
