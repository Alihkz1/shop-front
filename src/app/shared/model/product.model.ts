export interface Product {
    productId: number;
    categoryId: number;
    categoryName?: string;
    price: number;
    long: number;
    title: string;
    description: string;
    imageUrl: string[] | any;
    amount: number;
    likes: number;
    size: string;
    primaryImageIndex: number;
}