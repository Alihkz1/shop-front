import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingComponent } from './components/admin-routing/admin-routing.component';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './components/admin-menu/add-product/add-product.component';
import { NzInputModule } from 'ng-zorro-antd/input';

const NZ = [
  NzButtonModule,
  NzSelectModule,
  NzInputModule,
]


@NgModule({
  declarations: [AdminRoutingComponent, AdminMenuComponent, AdminProfileComponent, AddProductComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderComponent,
    TranslateModule,
    ReactiveFormsModule,
    ...NZ
  ]
})
export class AdminModule { }
