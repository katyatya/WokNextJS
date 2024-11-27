import { axiosInstance } from './axios-instance'
import { CartDTO, CreateCartItemValuesDTO } from './dto/cart.dto'

export const fetchCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>('/cart')).data
}

export const fetchUpdateItemQuantity = async (
	id: number,
	quantity: number
): Promise<CartDTO> => {
	return (
		await axiosInstance.patch<CartDTO>(`/cart/${id}`, {
			quantity,
		})
	).data
}

export const fetchRemoveCartItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>(`/cart/${id}`)).data
}

export const fetchAddCartItem = async (
	values: CreateCartItemValuesDTO
): Promise<CartDTO> => {
	return (await axiosInstance.post<CartDTO>('/cart', values)).data
}
