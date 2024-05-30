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
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AllCommentsComponent } from './components/admin-menu/all-comments/all-comments.component';

const NZ = [
  NzButtonModule,
  NzSelectModule,
  NzInputModule,
  NzUploadModule,
  NzIconModule,
  NzPopconfirmModule,
  NzModalModule
]


@NgModule({
  declarations: [AdminRoutingComponent, AdminMenuComponent, AdminProfileComponent, AddProductComponent, AllCommentsComponent],
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
