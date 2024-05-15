import { Component, EventEmitter, Output } from '@angular/core';
import { GovernorateService } from '../../Services/governorate.service';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.css'
})
export class FiltersSidebarComponent {
  
  constructor(private governmentservice : GovernorateService) { }
  ngOnInit(): void {
   
  }
  
 
 
  

}