import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { MenuComponent } from "./components/menu/menu.component";
import { CategoriesComponent } from "./components/categories/categories.component";
import { ProductsComponent } from "./components/products/products.component";
import { ProductDetailComponent } from "./components/product-detail/product-detail.component";
import { AboutUsComponent } from "./components/about-us/about-us.component";

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
                path: 'products/:categoryId',
                component: ProductsComponent,
                children: [
                    {
                        path: ':productId',
                        component: ProductDetailComponent
                    },
                ]
            },
            // {
            //     path: 'products',
            //     component: ProductsComponent,
            // },
            // {
            //     path: 'detail',
            //     component: ProductDetailComponent
            // },
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