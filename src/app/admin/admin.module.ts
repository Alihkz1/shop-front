import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingComponent } from './components/admin-routing/admin-routing.component';
import { AdminRoutingModule } from './admin.routing.module';
import { AdminMenuComponent } from './components/admin-menu/admin-menu.component';
import { AdminProfileComponent } from './components/admin-profile/admin-profile.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import { TranslateModule } from "@ngx-translate/core";
import { NzButtonModule } from 'ng-zorro-antd/button';

const NZ = [
  NzButtonModule
]


@NgModule({
  declarations: [AdminRoutingComponent, AdminMenuComponent, AdminProfileComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HeaderComponent,
    TranslateModule,
    ...NZ
  ]
})
export class AdminModule { }
