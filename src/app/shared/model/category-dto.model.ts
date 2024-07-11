import { ProductDto } from "./product-dto.model"

export interface CategoryDto {
    categoryId: number
    categoryName: string
    imageUrl: string
    products: ProductDto[]
}