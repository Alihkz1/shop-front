export const ADMIN_BUTTONS: IHeaderButton[] = [
    {
        title: "dashboard",
        route: "admin/add-product"
    },
    {
        title: "products",
        route: "menu/categories"
    },
]

export const USER_BUTTONS: IHeaderButton[] = [
    {
        title: "contactUs",
        route: "menu/about-us"
    },
    {
        title: "orders",
        route: "menu/orders"
    },
    {
        title: "products",
        route: "menu/categories"
    },
]

export interface IHeaderButton {
    title: string;
    route: string
}