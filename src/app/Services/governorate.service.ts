import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GovernorateService {
  governorates: string[] = ['All' , 'Cairo', 'Alexandria', 'Port Said', 'Suez',
    'Damietta', 'Dakahlia', 'Beheira', 'Kafr El Sheikh', 'Gharbia',
    'Monufia', 'Qalyubia', 'Sharqia', 'Ismailia', 'Giza', 'Faiyum',
    'Beni Suef', 'Minya', 'Asyut', 'Sohag', 'Qena', 'Luxor', 'Aswan',
    'Red Sea', 'New Valley', 'Matrouh','North Sinai', 'South Sinai'
  ];

  constructor() { }
  getGovernorates() {
    return this.governorates;
  }
}
