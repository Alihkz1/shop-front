export const ADMIN_BUTTONS: IHeaderButton[] = [
    {
        title: "products",
        route: "menu/categories"
    },
    {
        title: "dashboard",
        route: "admin/add-product"
    },
]

export const USER_BUTTONS: IHeaderButton[] = [
    {
        title: "contactUs",
        route: "menu/about-us"
    },
    {
        title: "products",
        route: "menu/categories"
    },
    {
        title: "orders",
        route: "menu/orders"
    }
]

export interface IHeaderButton {
    title: string;
    route: string
}