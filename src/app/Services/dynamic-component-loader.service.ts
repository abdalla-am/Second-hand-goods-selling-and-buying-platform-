import { ComponentFactoryResolver, Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DynamicComponentLoaderService {

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  loadComponent(component: any, container: ViewContainerRef) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    container.clear();
    container.createComponent(componentFactory);
  }
}
