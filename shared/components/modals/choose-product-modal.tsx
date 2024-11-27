'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '../ui'
import { DialogContent } from '../ui/dialog'
import { cn } from '@/shared/lib/utils'
import { ChooseProductForm, ChooseWokForm } from '../shared'
import { ProductWithRelations } from '@/@types/prisma'
import { useCartStore } from '@/shared/store/cart'
import toast from 'react-hot-toast'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const isWokForm = Boolean(product.variations[0].wokType)
	const [addCartItem, loading] = useCartStore(state => [
		state.addCartItem,
		state.loading,
	])

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

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				{isWokForm ? (
					<ChooseWokForm
						imageUrl={product.imageUrl}
						name={product.name}
						ingredients={product.ingredients}
						variations={product.variations}
						onSubmit={onSubmit}
						loading={loading}
					/>
				) : (
					<ChooseProductForm
						imageUrl={product.imageUrl}
						name={product.name}
						variations={product.variations}
						onSubmit={onSubmit}
						loading={loading}
					/>
				)}
			</DialogContent>
		</Dialog>
	)
}
