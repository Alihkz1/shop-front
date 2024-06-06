import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingComponent } from './auth.routing.component';
import { AuthRoutingModule } from './auth.routing.module';
import { TranslateModule } from "@ngx-translate/core";
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ForgetPasswordComponent } from './components/forget-password/forget-password.component';
import { HeaderComponent } from '../shared/component/header/header.component';

const NZ = [
  NzInputModule,
  NzButtonModule
]

@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthRoutingComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    ...NZ,
    HeaderComponent,
    ReactiveFormsModule
  ],
})
export class AuthModule { }
