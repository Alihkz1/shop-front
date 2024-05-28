import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './components/menu/menu.component';
import { HeaderComponent } from '../shared/component/header/header.component';
import { MenuRoutingModule } from './menu.routing.module';



@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    HeaderComponent,
    MenuRoutingModule
  ]
})
export class MenuModule { }
