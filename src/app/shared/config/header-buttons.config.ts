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
        title: "aboutUs",
        route: "menu/about-us"
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