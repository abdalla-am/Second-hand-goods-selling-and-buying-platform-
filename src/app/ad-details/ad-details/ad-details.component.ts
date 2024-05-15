import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-ad-details',
  templateUrl: './ad-details.component.html',
  styleUrls: ['./ad-details.component.css']
})
export class AdDetailsComponent {
  @Input() ad: any; // Assuming ad is passed as input from parent component
}
