import React from 'react'
import { CartStateItem, useCartStore } from '../store/cart'
import { CreateCartItemValuesDTO } from '@/services/dto/cart.dto'

type ReturnProps = {
	totalAmount: number
	items: CartStateItem[]
	loading: boolean
	updateItemQuantity: (id: number, quantity: number) => void
	removeCartItem: (id: number) => void
	addCartItem: (values: CreateCartItemValuesDTO) => void
}

export const UseCart = (): ReturnProps => {
	const cartState = useCartStore(state => state)
	React.useEffect(() => {
		cartState.fetchCartItems()
	}, [])
	return cartState
}
