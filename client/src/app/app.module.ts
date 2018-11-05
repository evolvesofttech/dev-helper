import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/admin/dashboard/dashboard.component';
import { AdminCategoryComponent } from './components/admin/admin-category/admin-category.component';
import { AdminAddCategoryComponent } from './components/admin/admin-add-category/admin-add-category.component';
import { AdminEditCategoryComponent } from './components/admin/admin-edit-category/admin-edit-category.component';
import { CategoryService } from './services/category.service';

export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    AdminCategoryComponent,
    AdminAddCategoryComponent,
    AdminEditCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        authScheme:'',
        whitelistedDomains: ['localhost:3003', 'localhost:4200']
      }
    })
  ],
  providers: [ AuthService, CategoryService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
