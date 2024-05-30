import { RouterModule, Routes } from "@angular/router";
import { AdminRoutingComponent } from "./components/admin-routing/admin-routing.component";
import { NgModule } from "@angular/core";
import { AdminMenuComponent } from "./components/admin-menu/admin-menu.component";
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";
import { AddProductComponent } from "./components/admin-menu/add-product/add-product.component";
import { UsersListComponent } from "./components/admin-menu/users-list/users-list.component";
import { AllCommentsComponent } from "./components/admin-menu/all-comments/all-comments.component";

export const routes: Routes = [
    {
        path: '',
        component: AdminRoutingComponent,
        children: [
            {
                path: '',
                component: AdminMenuComponent,
                children: [
                    {
                        path: 'add-product',
                        component: AddProductComponent
                    },
                    {
                        path: 'users-list',
                        component: UsersListComponent
                    },
                    {
                        path: 'all-comments',
                        component: AllCommentsComponent
                    }
                ]
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