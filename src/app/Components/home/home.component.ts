import { Component } from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
categories: any;
constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }


}
