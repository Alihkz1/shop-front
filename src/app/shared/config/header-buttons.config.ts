export const ADMIN_BUTTONS: IHeaderButton[] = [
    {
        title: "dashboard",
        route: "admin/product-management"
    },
    {
        title: "products",
        route: "menu/categories"
    },
]

export const USER_BUTTONS: IHeaderButton[] = [
    {
        title: "myOrders",
        route: "menu/orders"
    },
    {
        title: "products",
        route: "menu/categories"
    },
    {
        title: 'saved',
        svg: "assets/svg/unsaved.svg",
        route: "menu/saved"
    },
]

export const NOT_LOGIN_BUTTONS: IHeaderButton[] = [
    {
        title: "contactUs",
        route: "menu/about-us"
    },
    {
        title: "trackOrder",
        route: "menu/track"
    },
    {
        title: "products",
        route: "menu/categories"
    },
]

export interface IHeaderButton {
    title?: string;
    svg?: string;
    route: string
}