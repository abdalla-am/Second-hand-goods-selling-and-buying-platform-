import { Component, EventEmitter, Output } from '@angular/core';
import { GovernorateService } from '../../Services/governorate.service';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.css'
})
export class FiltersSidebarComponent {
  government: any;
  constructor(private governmentservice : GovernorateService) { }
  ngOnInit(): void {
    this.government = this.governmentservice.getGovernorates();
  }
  
  minPrice: number | undefined;
  maxPrice: number | undefined;
  selectedGovernorate: string | undefined;
  conditions: string[] = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  selectedConditions: string[] = [];
  selectedDates: string[] = [];
 
  
  @Output() filtersChanged: EventEmitter<any> = new EventEmitter<any>();
  // Method to handle changes in filters
  onFiltersChanged(): void {
    // Collect selected filters
    const filters = {
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      selectedGovernorate: this.selectedGovernorate,
      selectedConditions: this.selectedConditions,
      selectedDates: this.selectedDates
    };
    this.filtersChanged.emit(filters); // Emit event with selected filters
  }
}