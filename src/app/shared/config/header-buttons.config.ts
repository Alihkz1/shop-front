export const ADMIN_BUTTONS: IHeaderButton[] = [
    {
        title: "dashboard",
        route: "admin/add-product"
    },
    {
        title: "products",
        route: "menu/categories"
    }
]

export const USER_BUTTONS: IHeaderButton[] = [
    {
        title: "products",
        route: "menu/categories"
    },
    {
        title: "aboutUs",
        route: "menu/about-us"
    }
]

export interface IHeaderButton {
    title: string;
    route: string
}