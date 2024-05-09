import { Component } from '@angular/core';

@Component({
  selector: 'app-filters-sidebar',
  templateUrl: './filters-sidebar.component.html',
  styleUrl: './filters-sidebar.component.css'
})
export class FiltersSidebarComponent {
  governorates: string[] = ['All' , 'Cairo', 'Alexandria', 'Port Said', 'Suez',
    'Damietta', 'Dakahlia', 'Beheira', 'Kafr El Sheikh', 'Gharbia',
    'Monufia', 'Qalyubia', 'Sharqia', 'Ismailia', 'Giza', 'Faiyum',
    'Beni Suef', 'Minya', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan',
    'Red Sea', 'New Valley', 'Matrouh','North Sinai', 'South Sinai'
  ];
  conditions: string[] = ['Excellent', 'Very Good', 'Good', 'Fair', 'Poor'];
  minPrice: number | undefined;
  maxPrice: number | undefined;
  selectedGovernorate: string | undefined;

}
