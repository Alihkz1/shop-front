import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import { MenuRoutingModule } from './menu.routing.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';



@NgModule({
  declarations: [
    MenuComponent,
    AboutUsComponent,
    CategoriesComponent,
    ProductDetailComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    MenuRoutingModule
  ]
})
export class MenuModule { }
