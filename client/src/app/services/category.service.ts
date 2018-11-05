import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  categories: Category[] = [];

  constructor(private http: HttpClient, private router: Router) { }

  getCategory(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiUrl + '/categories');
  }

  addCategory(category: Category) {
    this.http.post(environment.apiUrl + '/categories', category)
      .subscribe(newCategory => {
        this.router.navigate(['admin/category']);
      })
  }

}
