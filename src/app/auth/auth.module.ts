import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AuthRoutingComponent } from './auth.routing.component';
import { AuthRoutingModule } from './auth.routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    AuthRoutingComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
  ],
})
export class AuthModule { }
