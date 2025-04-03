import { Category } from "src/category/entities/category.entity"
import { Color } from "src/colors/entities/color.entity"
import { Discount } from "src/discount/entities/discount.entity"
import { Size } from "src/sizes/entities/size.entity"

export type OrderProduct = {
    title: string,
    description: string,
    price: string,
    categoryId: number,
    category: Category,
    material: Object | null,
    discount_id: number | null,
    discount: Discount
    sizes: Size[],
    colors: Color[],
    images: string[],
    quantity: string
}