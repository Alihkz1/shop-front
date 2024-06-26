import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LayoutComponent } from "./layout/layout.component";
import { adminGuard } from "../shared/guard/admin.guard";

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'menu',
                loadChildren: () =>
                    import('../menu/menu.module').then((m) => m.MenuModule)
            },
            {
                path: 'auth',
                loadChildren: () =>
                    import('../auth/auth.module').then((m) => m.AuthModule)
            },
            {
                path: 'admin',
                loadChildren: () =>
                    import('../admin/admin.module').then((m) => m.AdminModule),
                // canActivate: [adminGuard]
            },
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule { }