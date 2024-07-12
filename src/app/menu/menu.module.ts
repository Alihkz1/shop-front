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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MenuProfileComponent } from './components/menu-profile/menu-profile.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ShopCardComponent } from './components/shop-card/shop-card.component';
import { CategoryModalComponent } from '../shared/component/category-modal/category-modal.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { CurrencyPipe } from '../shared/pipe/currency.pipe';
import { ConfirmCardComponent } from './components/confirm-card/confirm-card.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { LoadingComponent } from '../shared/component/loading/loading.component';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { TrackOrderComponent } from './components/track-order/track-order.component';
import { SteamComponent } from '../shared/component/steam/steam.component';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const NZ = [
  NzInputModule,
  NzButtonModule,
  NzIconModule,
  NzAlertModule,
  NzModalModule,
  NzPopconfirmModule,
  NzCheckboxModule,
  NzSelectModule,
  NzToolTipModule
]


@NgModule({
  declarations: [
    MenuComponent,
    AboutUsComponent,
    CategoriesComponent,
    ProductDetailComponent,
    ProductsComponent,
    ShopCardComponent,
    MenuProfileComponent,
    ConfirmCardComponent,
    MyOrdersComponent,
    TrackOrderComponent,
    LandingPageComponent,
  ],
  imports: [
    CommonModule,
    CategoryModalComponent,
    HeaderComponent,
    MenuRoutingModule,
    TranslateModule,
    ReactiveFormsModule,
    CurrencyPipe,
    FormsModule,
    LoadingComponent,
    SteamComponent,
    NzDropDownModule,
    ...NZ,
  ]
})
export class MenuModule { }
