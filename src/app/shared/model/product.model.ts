export interface Product {
    productId: number;
    categoryId: number;
    price: number;
    long: number;
    title: string;
    description: string;
    imageUrl: string[] | any;
    amount: number;
    size: string;
}