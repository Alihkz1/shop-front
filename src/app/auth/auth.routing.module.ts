import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { NgModule } from "@angular/core";
import { AuthRoutingComponent } from "./auth.routing.component";
import { SignupComponent } from "./components/signup/signup.component";
import { ForgetPasswordComponent } from "./components/forget-password/forget-password.component";

export const routes: Routes = [
    {
        path: '',
        component: AuthRoutingComponent,
        children: [
            {
                path: 'login',
                component: LoginComponent,
            },
            {
                path: 'signup',
                component: SignupComponent,
            },
            {
                path: 'forget-password',
                component: ForgetPasswordComponent,
            },
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }