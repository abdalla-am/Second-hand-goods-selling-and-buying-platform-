import { Component , OnInit} from '@angular/core';
import { CategoriesService } from '../../Services/categories.service';

@Component({
  selector: 'app-generate-post',
  templateUrl: './generate-post.component.html',
  styleUrl: './generate-post.component.css'
})
export class GeneratePostComponent {
  categories: { value: string; label: string; icon: string;}[]= [];
  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {
    this.categories = this.categoryService.getCategories();
  }

}
