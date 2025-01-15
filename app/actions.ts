'use server'

import { prisma } from '@/prisma/prisma-client'
import { TCheckoutForm } from '@/shared/components/shared'
import { PayOrderTemplate } from '@/shared/components/shared/email-temapltes'
import { createPayment, sendEmail } from '@/shared/lib'
import { OrderStatus } from '@prisma/client'
import { cookies } from 'next/headers'

export async function createOrder(data: TCheckoutForm) {
	try {
		const cookieStore = cookies()
		const cartToken = cookieStore.get('cartToken')?.value

		if (!cartToken) {
			throw new Error('Cart token not found')
		}
		/* Находим корзину по токену */
		const userCart = await prisma.cart.findFirst({
			include: {
				user: true,
				items: {
					include: {
						ingredients: true,
						productVariation: {
							include: {
								product: true,
							},
						},
					},
				},
			},
			where: {
				token: cartToken,
			},
		})
		/* Если корзина не найдена возращаем ошибку */
		if (!userCart) {
			throw new Error('Cart not found')
		}
		/* Если корзина пустая возращаем ошибку */
		if (userCart?.totalAmount === 0) {
			throw new Error('Cart is empty')
		}
		/* Создаем заказ */
		const order = await prisma.order.create({
			data: {
				token: cartToken,
				fullName: data.firstName + ' ' + data.lastName,
				email: data.email,
				phone: data.phone,
				address: data.address,
				comment: data.comment,
				totalAmount: userCart.totalAmount,
				status: OrderStatus.PENDING,
				items: JSON.stringify(userCart.items),
			},
		})
		/* Очищаем корзину */
		await prisma.cart.update({
			where: {
				id: userCart.id,
			},
			data: {
				totalAmount: 0,
			},
		})

		await prisma.cartItem.deleteMany({
			where: {
				cartId: userCart.id,
			},
		})
		/* Создает оплату на yookassa */
		const paymentData = await createPayment({
			description: `Оплата заказа №${order.id}`,
			orderId: order.id,
			amount: order.totalAmount,
		})

		if (!paymentData) {
			throw new Error('Payment data not found')
		}

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				paymentId: paymentData.id,
			},
		})

		const paymentUrl = paymentData.confirmation.confirmation_url

		await sendEmail(
			data.email,
			'testing pay order',
			PayOrderTemplate({
				orderId: order.id,
				totalAmount: order.totalAmount,
				paymentUrl: paymentUrl,
			})
		)
		return paymentUrl
	} catch (error) {
		console.log('[Create order] Server error', error)
	}
}
