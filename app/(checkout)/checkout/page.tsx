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

export default function CheckoutPage() {
	const { totalAmount, items, removeCartItem, updateItemQuantity } = UseCart()

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

	const onSubmit = (data: TCheckoutForm) => {
		console.log(data)
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
							/>
							<CheckoutPersonalForm />
							<CheckoutAddressForm />
						</div>
						<div className='w-[450px]'>
							<CheckoutSidebar totalAmount={totalAmount} />
						</div>
					</div>
				</form>
			</FormProvider>
		</Container>
	)
}
