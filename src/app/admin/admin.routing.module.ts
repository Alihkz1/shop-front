import { RouterModule, Routes } from "@angular/router";
import { AdminRoutingComponent } from "./components/admin-routing/admin-routing.component";
import { NgModule } from "@angular/core";
import { AdminMenuComponent } from "./components/admin-menu/admin-menu.component";
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";

export const routes: Routes = [
    {
        path: '',
        component: AdminRoutingComponent,
        children: [
            {
                path: '',
                component: AdminMenuComponent
            },
            {
                path: 'profile',
                component: AdminProfileComponent
            }
        ],
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }