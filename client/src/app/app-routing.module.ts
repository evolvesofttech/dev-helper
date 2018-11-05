import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminAddCategoryComponent } from './components/admin/admin-add-category/admin-add-category.component';
import { AdminEditCategoryComponent } from './components/admin/admin-edit-category/admin-edit-category.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'login', component:LoginComponent },
  { path:'admin/dashboard', component:DashboardComponent },
  { path:'admin/category', component:AdminCategoryComponent },
  { path:'admin/add-category', component:AdminAddCategoryComponent },
  { path:'admin/edit-category/:id', component:AdminEditCategoryComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
