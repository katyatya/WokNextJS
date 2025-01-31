import { create } from 'zustand'
import { getCartDetails } from '../lib'
import { Api } from '@/services/api-client'
import { CreateCartItemValuesDTO } from '@/services/dto/cart.dto'

export type CartStateItem = {
	id: number
	quantity: number
	name: string
	imageUrl: string
	price: number
	disabled?: boolean
	wokSize?: string | null
	wokType?: number | null
	ingredients: Array<{ name: string; price: number }>
}

export interface CartState {
	loading: boolean
	error: boolean
	totalAmount: number
	items: CartStateItem[]

	fetchCartItems: () => Promise<void>
	updateItemQuantity: (id: number, quantity: number) => Promise<void>
	addCartItem: (values: CreateCartItemValuesDTO) => Promise<void>
	removeCartItem: (id: number) => Promise<void>
}

export const useCartStore = create<CartState>((set, get) => ({
	items: [],
	error: false,
	loading: true,
	totalAmount: 0,

	fetchCartItems: async () => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.fetchCart()
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	updateItemQuantity: async (id: number, quantity: number) => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.fetchUpdateItemQuantity(id, quantity)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},

	removeCartItem: async (id: number) => {
		try {
			set(state => ({
				loading: true,
				error: false,
				items: state.items.map(item =>
					item.id == id ? { ...item, disabled: true } : item
				),
			}))
			const data = await Api.cart.fetchRemoveCartItem(id)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set(state => ({
				loading: false,
				items: state.items.map(item =>
					item.id == id ? { ...item, disabled: false } : item
				),
			}))
		}
	},

	addCartItem: async values => {
		try {
			set({ loading: true, error: false })
			const data = await Api.cart.fetchAddCartItem(values)
			set(getCartDetails(data))
		} catch (error) {
			console.error(error)
			set({ error: true })
		} finally {
			set({ loading: false })
		}
	},
}))
