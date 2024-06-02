import { Product } from "./product.model";

export interface Category {
    categoryId?: number;
    categoryName?: string;
    imageUrl?: string;
    products?: Product[];
}