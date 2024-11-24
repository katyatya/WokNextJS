import { CartDTO } from '@/services/dto/cart.dto'
import { calcCartItemTotalPrice } from './calc-cart-item-total-price'
import { CartStateItem } from '../store/cart'

export interface ReturnProps {
	totalAmount: number
	items: CartStateItem[]
}

export const getCartDetails = (data: CartDTO): ReturnProps => {
	const items = data.items.map(item => ({
		id: item.id,
		quantity: item.quantity,
		name: item.productVariation.product.name,
		imageUrl: item.productVariation.product.imageUrl,
		price: calcCartItemTotalPrice(item),
		wokSize: item.productVariation.size,
		wokType: item.productVariation.wokType,
		ingredients: item.ingredients.map(ingredient => ({
			name: ingredient.name,
			price: ingredient.price,
		})),
	}))

	return {
		items,
		totalAmount: data.totalAmount,
	}
}
