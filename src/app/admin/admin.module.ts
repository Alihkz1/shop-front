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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductManagementComponent } from './components/admin-menu/product-management/product-management.component';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { AllCommentsComponent } from './components/admin-menu/all-comments/all-comments.component';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NoImageDirective } from '../shared/no-image.directive';
import { NzTableModule } from 'ng-zorro-antd/table';
import { UsersListComponent } from './components/admin-menu/users-list/users-list.component';
import { CategoryModalComponent } from '../shared/component/category-modal/category-modal.component';
import { ProductModalComponent } from '../shared/component/product-modal/product-modal.component';
import { CurrencyPipe } from '../shared/pipe/currency.pipe';
import { UsersOrdersComponent } from './components/admin-menu/users-orders/users-orders.component';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { LoadingComponent } from '../shared/component/loading/loading.component';
import { ProductCrudComponent } from './components/admin-menu/product-crud/product-crud.component';
import { ImageCropperModalComponent } from '../shared/component/image-cropper-modal/image-cropper-modal.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { PriceFormatDirective } from '../menu/shared/directive/price-format.directive';
import { CarouselComponent } from '../shared/component/carousel/carousel.component';

const NZ = [
  NzButtonModule,
  NzSelectModule,
  NzInputModule,
  NzUploadModule,
  NzIconModule,
  NzPopconfirmModule,
  NzModalModule,
  NzCollapseModule,
  NzCheckboxModule,
  NzToolTipModule,
  NzTableModule,
  NzAlertModule,
  NzTabsModule
]


@NgModule({
  declarations: [AdminRoutingComponent, ProductCrudComponent, AdminMenuComponent, AdminProfileComponent, ProductManagementComponent, AllCommentsComponent, UsersOrdersComponent, UsersListComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderComponent,
    TranslateModule,
    ReactiveFormsModule,
    NoImageDirective,
    CategoryModalComponent,
    ProductModalComponent,
    CurrencyPipe,
    LoadingComponent,
    ImageCropperModalComponent,
    EditorModule,
    FormsModule,
    PriceFormatDirective,
    CarouselComponent,
    ...NZ,
  ]
})
export class AdminModule { }
