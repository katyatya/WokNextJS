'use client'
import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/shared/store/cart'
import { ChooseProductForm, ChooseWokForm } from './index'
import React from 'react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ProductsForm: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	])
	const isWokForm = Boolean(product.variations[0].wokType)
	const onSubmit = async (
		productVariationId?: number,
		ingredients?: number[]
	) => {
		const itemId = productVariationId ?? product.variations[0].id
		try {
			await addCartItem({
				productVariationId: itemId,
				ingredients,
			})
			toast('Товар добавлен в корзину', {
				style: {
					padding: '10px',
				},
				icon: '🎉',
			})
			router.back()
		} catch (error) {
			toast.error('Не удалось добавить товар в корзину ')
			console.error(error)
		}
	}

	if (isWokForm) {
		return (
			<ChooseWokForm
				imageUrl={product.imageUrl}
				name={product.name}
				ingredients={product.ingredients}
				variations={product.variations}
				onSubmit={onSubmit}
				loading={loading}
			/>
		)
	}

	return (
		<ChooseProductForm
			imageUrl={product.imageUrl}
			name={product.name}
			variations={product.variations}
			onSubmit={onSubmit}
			loading={loading}
		/>
	)
}
