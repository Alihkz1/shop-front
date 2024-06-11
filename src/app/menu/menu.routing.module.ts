import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { MenuProfileComponent } from "./components/menu-profile/menu-profile.component";
import { ShopCardComponent } from "./components/shop-card/shop-card.component";

export const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: 'categories',
                component: CategoriesComponent
            },
            {
                path: 'profile',
                component: MenuProfileComponent
            },
            {
                path: 'card/:userId',
                component: ShopCardComponent
            },
            {
                path: 'products/:categoryId',
                component: ProductsComponent,
            },
            {
                path: 'products/:categoryId/:productId',
                component: ProductDetailComponent,
            },
            {
                path: 'about-us',
                component: AboutUsComponent
            }
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }