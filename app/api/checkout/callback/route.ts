import { PaymentCallbackData } from '@/@types/yookassa'
import { prisma } from '@/prisma/prisma-client'
import { CartItemDTO } from '@/services/dto/cart.dto'
import { OrderFailedTemplate } from '@/shared/components/shared/email-temapltes/order-failed-template'
import { OrderSuccessTemplate } from '@/shared/components/shared/email-temapltes/order-success'
import { sendEmail } from '@/shared/lib'
import { OrderStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	try {
		const body = (await req.json()) as PaymentCallbackData

		const order = await prisma.order.findFirst({
			where: {
				id: Number(body.object.metadata.order_id),
			},
		})

		if (!order) {
			return NextResponse.json({ error: 'Order not found' })
		}

		const isSucceeded = body.object.status === 'succeeded'

		await prisma.order.update({
			where: {
				id: order.id,
			},
			data: {
				status: isSucceeded ? OrderStatus.SUCCEEDED : OrderStatus.CANCELLED,
			},
		})

		const items = JSON.parse(order?.items as string) as CartItemDTO[]

		if (isSucceeded) {
			await sendEmail(
				order.email,
				'wokMaster / Ваш заказ успешно оформлен 🎉',
				OrderSuccessTemplate({ orderId: order.id, items })
			)
		} else {
			await sendEmail(
				order.email,
				'wokMaster / Возникла ошибка при оплате заказа 😢',
				OrderFailedTemplate({ orderId: order.id })
			)
		}
	} catch (error) {
		console.log('[Checkout Callback] Error:', error)
		return NextResponse.json({ error: 'Server error' })
	}
}
