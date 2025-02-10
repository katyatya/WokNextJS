'use client'
import React from 'react'
import { Button } from '../ui'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { CartDrawer } from './cart-drawer'
import { useCartStore } from '@/shared/store/cart'
interface Props {
	className?: string
	loading?: boolean
}
export const CartButton: React.FC<Props> = () => {
	const [totalAmount, items, loading] = useCartStore(state => [
		state.totalAmount,
		state.items,
		state.loading,
	])
	const count = items.reduce((acc, item) => acc + item.quantity, 0)
	return (
		<CartDrawer>
			<Button
				loading={loading}
				className='group relative  max-[400px]:gap-0 max-[400px]:text-xs'
			>
				<b>{totalAmount} p</b>
				<span className='bg-white/30 h-full mx-3 w-[1px]' />
				<div className='flex items-center gap-2 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
					<b>{count}</b>
				</div>
				<ArrowRight className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
			</Button>
		</CartDrawer>
	)
}
