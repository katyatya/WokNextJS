'use client'

import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
	CheckoutCart,
	checkoutFormSchema,
	CheckoutPersonalForm,
	CheckoutSidebar,
	Container,
} from '@/shared/components/shared'

import { UseCart } from '@/shared/hooks'
import { CheckoutAddressForm, TCheckoutForm } from '@/shared/components/shared'
import { cn } from '@/shared/lib/utils'
import { createOrder } from '@/app/actions'
import toast from 'react-hot-toast'
import { useState } from 'react'

export default function CheckoutPage() {
	const [submitting, setSubmitting] = useState(false)
	const { totalAmount, items, removeCartItem, updateItemQuantity, loading } =
		UseCart()

	const form = useForm<TCheckoutForm>({
		resolver: zodResolver(checkoutFormSchema),
		defaultValues: {
			email: '',
			firstName: '',
			lastName: '',
			phone: '',
			address: '',
			comment: '',
		},
	})

	const onSubmit = async (data: TCheckoutForm) => {
		try {
			setSubmitting(true)
			const url = await createOrder(data)
			toast.success('Заказ успешно оформлен! Переход на оплату.....')
			if (url) {
				location.href = url
			}
		} catch (error) {
			setSubmitting(false)
			toast.error('Не удалось создать заказ', {
				icon: '😪',
			})
		}
	}

	//TODO: вынести onClickCountButton отсюда и cart-drawer.tsx
	const onClickCountButton = (
		id: number,
		quantity: number,
		type: 'plus' | 'minus'
	) => {
		const newQuantity = type === 'minus' ? quantity - 1 : quantity + 1
		updateItemQuantity(id, newQuantity)
	}

	return (
		<Container>
			<FormProvider {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className='flex gap-10'>
						<div className='flex flex-col gap-10 flex-1 mb-20'>
							<CheckoutCart
								items={items}
								onClickCountButton={onClickCountButton}
								removeCartItem={removeCartItem}
								loading={loading}
							/>
							<CheckoutPersonalForm
								className={cn({ 'opacity-50 pointer-events-none': loading })}
							/>
							<CheckoutAddressForm
								className={cn({ 'opacity-50 pointer-events-none': loading })}
							/>
						</div>
						<div className='w-[450px]'>
							<CheckoutSidebar
								totalAmount={totalAmount}
								loading={loading || submitting}
							/>
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
