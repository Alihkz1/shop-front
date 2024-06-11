import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import { MenuRoutingModule } from './menu.routing.module';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductsComponent } from './components/products/products.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TranslateModule } from "@ngx-translate/core";
import { ReactiveFormsModule } from '@angular/forms';
import { MenuProfileComponent } from './components/menu-profile/menu-profile.component';
import { NzIconModule } from 'ng-zorro-antd/icon';

const NZ = [
  NzInputModule,
  NzButtonModule,
  NzIconModule
]


@NgModule({
  declarations: [
    MenuComponent,
    AboutUsComponent,
    CategoriesComponent,
    ProductDetailComponent,
    ProductsComponent,
    MenuProfileComponent
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    MenuRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    ...NZ
  ]
})
export class MenuModule { }
