'use client'

import React from 'react'

import Image from 'next/image'
import {
	Sheet,
	SheetClose,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from '@/shared/components/ui/sheet'
import Link from 'next/link'
import { Button } from '../ui'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { cn } from '@/shared/lib/utils'
import { CartDrawerItem, Title } from '.'
import { getCartItemDetails } from '@/shared/lib'
import { WokSize, WokType } from '@/shared/constans/wok'
import { UseCart } from '@/shared/hooks'

export const CartDrawer: React.FC<React.PropsWithChildren> = ({ children }) => {
	const { totalAmount, items, updateItemQuantity, removeCartItem } = UseCart()
	const [redirecting, setRedirecting] = React.useState(false)

	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		let newQuantity = type === 'minus' ? quantity - 1 : quantity + 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Sheet>
			<SheetTrigger asChild>{children}</SheetTrigger>

			<SheetContent className='flex flex-col justify-between pb-0 bg-[#F4F1EE]'>
				<div
					className={cn(
						'flex flex-col h-full',
						!totalAmount && 'justify-center'
					)}
				>
					{totalAmount > 0 ? (
						<SheetHeader>
							<SheetTitle>
								<span className='font-bold'>товаров {items.length}</span>
							</SheetTitle>
						</SheetHeader>
					) : (
						''
					)}

					{!totalAmount && (
						<div className='flex flex-col items-center justify-center w-52 mx-auto'>
							<Image
								src='/empty-box.png'
								alt='Empty cart'
								width={120}
								height={120}
								className='max-sm:h-[90px] max-sm:w-[90px]'
							/>
							<Title
								size='sm'
								text='Корзина пустая'
								className='text-center font-bold my-2 max-sm:my-1'
							/>
							<p className='text-center text-neutral-500 mb-5 '>
								Добавьте хотя бы один товар, чтобы совершить заказ
							</p>

							<SheetClose>
								<Button className='w-56 h-12 text-base max-sm:!w-40' size='lg'>
									<ArrowLeft className='w-5 mr-2' />
									Вернуться назад
								</Button>
							</SheetClose>
						</div>
					)}
					{totalAmount > 0 ? (
						<>
							<div className='overflow-auto flex-1 -mx-6 mt-5 scrollbar'>
								{items.map(item => (
									<div className='mb-2' key={item.id}>
										<CartDrawerItem
											key={item.id}
											id={item.id}
											imageUrl={item.imageUrl}
											details={getCartItemDetails(
												item.ingredients,
												item.wokType as WokType,
												item.wokSize as WokSize
											)}
											disabled={item.disabled}
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
											Итого
											<div className='flex-1 border-b border-dashed border-b-neutral-200 relative -top-1 mx-2' />
										</span>

										<span className='font-bold text-lg'>{totalAmount} ₽</span>
									</div>
									<Link href='/checkout'>
										<Button
											onClick={() => setRedirecting(true)}
											loading={redirecting}
											type='submit'
											className='w-full h-12 text-base'
										>
											Оформить заказ
											<ArrowRight className='w-5 ml-2' />
										</Button>
									</Link>
								</div>
							</SheetFooter>
						</>
					) : (
						''
					)}
				</div>
			</SheetContent>
		</Sheet>
	)
}
