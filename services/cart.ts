import { axiosInstance } from './axios-instance'
import { CartDTO } from './dto/cart.dto'

export const fetchCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>('/cart')
	return data
}

export const fetchUpdateItemQuantity = async (
	id: number,
	quatity: number
): Promise<CartDTO> => {
	const { data } = await axiosInstance.patch<CartDTO>(`/cart/${id}`, {
		quatity,
	})
	return data
}
