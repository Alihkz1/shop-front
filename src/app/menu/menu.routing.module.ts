import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";
import { MenuProfileComponent } from "./components/menu-profile/menu-profile.component";
import { ShopCardComponent } from "./components/shop-card/shop-card.component";
import { ConfirmCardComponent } from "./components/confirm-card/confirm-card.component";
import { MyOrdersComponent } from "./components/my-orders/my-orders.component";
import { TrackOrderComponent } from "./components/track-order/track-order.component";
import { LandingPageComponent } from "./components/landing-page/landing-page.component";
import { SavedProductsComponent } from "./components/saved-products/saved-products.component";

export const routes: Routes = [
    {
        path: '',
        component: MenuComponent,
        children: [
            {
                path: 'landing',
                component: LandingPageComponent
            },
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
                path: 'confirm-card',
                component: ConfirmCardComponent,
            },
            {
                path: 'orders',
                component: MyOrdersComponent,
            },
            {
                path: 'about-us',
                component: AboutUsComponent
            },
            {
                path: 'track',
                component: TrackOrderComponent
            },
            {
                path: 'saved',
                component: SavedProductsComponent
            }
        ]
    },
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class MenuRoutingModule { }