import React from 'react'
import { Button } from '../ui'
import { ArrowRight, ShoppingCart } from 'lucide-react'
import { CartDrawer } from './cart-drawer'
interface Props {
	className?: string
}
export const CartButton: React.FC<Props> = () => {
	return (
		<CartDrawer>
			<Button className='group relative'>
				<b>520 p</b>
				<span className='bg-white/30 h-full mx-3 w-[1px]' />
				<div className='flex items-center gap-2 transition duration-300 group-hover:opacity-0'>
					<ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
					<b>3</b>
				</div>
				<ArrowRight className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
			</Button>
		</CartDrawer>
	)
}
