import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BasicLayoutService {

  constructor() { }
  private showSidebarSubject = new BehaviorSubject<boolean>(false);
  showSidebar$ = this.showSidebarSubject.asObservable();
  toggleSidebar() {
    this.showSidebarSubject.next(!this.showSidebarSubject.value);
  }
  hideSidebar() {
    this.showSidebarSubject.next(false);
  }
}
