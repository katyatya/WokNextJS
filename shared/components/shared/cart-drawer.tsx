'use client'

import React from 'react'

import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet'
import Link from 'next/link'
import { Button } from '../ui'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { CartDrawerItem } from '.'
import { getCartItemDetails } from '@/shared/lib'
import { useCartStore } from '@/shared/store/cart'
import { WokSize, WokType } from '@/shared/constans/wok'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const [
		fetchCartItems,
		updateItemQuantity,
		removeCartItem,
		totalAmount,
		items,
	] = useCartStore(state => [
		state.fetchCartItems,
		state.updateItemQuantity,
		state.removeCartItem,
		state.totalAmount,
		state.items,
	])

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		let newQuantity = type === 'minus' ? quantity - 1 : quantity + 1
		updateItemQuantity(id, newQuantity)
	}

	React.useEffect(() => {
		fetchCartItems()
	}, [])

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<div className={cn('flex flex-col h-full')}>
					<SheetHeader>
						<SheetTitle>
							<span className='font-bold'>товар</span>
						</SheetTitle>
					</SheetHeader>

					<div className='overflow-auto flex-1 -mx-6 mt-5 scrollbar'>
						{items.map(item => (
							<div className='mb-2' key={item.id}>
								<CartDrawerItem
									key={item.id}
									id={item.id}
									imageUrl={item.imageUrl}
									details={
										item.wokSize && item.wokType
											? getCartItemDetails(
													item.ingredients,
													item.wokType as WokType,
													item.wokSize as WokSize
											  )
											: ''
									}
									name={item.name}
									price={item.price}
									quantity={item.quantity}
									onClickCountButton={type =>
										onClickCountButton(item.id, item.quantity, type)
									}
									onClickRemove={() => removeCartItem(item.id)}
								/>
							</div>
						))}
					</div>

					<SheetFooter className='-mx-6 bg-white p-8'>
						<div className='w-full'>
							<div className='flex mb-4'>
								<span className='flex flex-1 text-lg text-neutral-500'>
									Итого {totalAmount}
									<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
								</span>
							</div>

							<Link href='/cart'>
								<Button type='submit' className='w-full h-12 text-base'>
									Оформить заказ
									<ArrowRight className='w-5 ml-2' />
								</Button>
							</Link>
						</div>
					</SheetFooter>
				</div>
			</SheetContent>
		</Sheet>
	)
}
