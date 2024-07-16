import { Product } from "./product.model";

export interface Category {
    categoryId?: number;
    categoryName?: string;
    imageUrl?: string;
    productCount?: number; /* for category/light-list */
    products?: Product[];
}