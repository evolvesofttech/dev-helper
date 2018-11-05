import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/app/models/category.model';

@Component({
  selector: 'app-admin-category',
  templateUrl: './admin-category.component.html',
  styleUrls: ['./admin-category.component.css']
})
export class AdminCategoryComponent implements OnInit {

  categories: Category[] = [];
  
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.categoryService.getCategory()
      .subscribe(result => {
        console.log(result);
        this.categories = result;
      });
  }

}
