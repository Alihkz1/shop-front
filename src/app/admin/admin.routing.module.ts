import { RouterModule, Routes } from "@angular/router";
import { AdminRoutingComponent } from "./components/admin-routing/admin-routing.component";
import { NgModule } from "@angular/core";
import { AdminMenuComponent } from "./components/admin-menu/admin-menu.component";
import { AdminProfileComponent } from "./components/admin-profile/admin-profile.component";
import { ProductManagementComponent } from "./components/admin-menu/product-management/product-management.component";
import { UsersListComponent } from "./components/admin-menu/users-list/users-list.component";
import { AllCommentsComponent } from "./components/admin-menu/all-comments/all-comments.component";
import { UsersOrdersComponent } from "./components/admin-menu/users-orders/users-orders.component";
import { ProductCrudComponent } from "./components/admin-menu/product-crud/product-crud.component";

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
                        path: 'product-crud',
                        component: ProductCrudComponent
                    },
                    {
                        path: 'product-management',
                        component: ProductManagementComponent
                    },
                    {
                        path: 'profile',
                        component: AdminProfileComponent
                    },
                    {
                        path: 'users-list',
                        component: UsersListComponent
                    },
                    {
                        path: 'all-comments',
                        component: AllCommentsComponent
                    },
                    {
                        path: 'orders',
                        component: UsersOrdersComponent
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