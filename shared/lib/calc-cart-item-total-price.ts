import { CartItemDTO } from '@/services/dto/cart.dto'

export const calcCartItemTotalPrice = (item: CartItemDTO): number => {
	const ingredientsPrice = item.ingredients.reduce(
		(acc, ingredient) => acc + ingredient.price,
		0
	)
	const totalPrice =
		(ingredientsPrice + item.productVariation.price) * item.quantity

	return totalPrice
}
