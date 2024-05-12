import { Component } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  categories: any;

  constructor(private categoryService: CategoriesService,  private router: Router) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
    
  }
  navigateToAds(category: string) {
    this.router.navigate(['/ads', category]); // Navigate to the ads component with the selected category
  }
}
