import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'
import { findOrCreateCart, updateCartTotalAmount } from '@/shared/lib'
import { CreateCartItemValuesDTO } from '@/services/dto/cart.dto'

export async function GET(req: NextRequest) {
	try {
		const token = req.cookies.get('cartToken')?.value
		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				token,
			},
			include: {
				items: {
					orderBy: {
						createdAt: 'desc',
					},
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
		})

		return NextResponse.json(userCart)
	} catch (error) {
		console.log('[CART_GET] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось получить корзину' },
			{ status: 500 }
		)
	}
}
export async function POST(req: NextRequest) {
	try {
		let token = req.cookies.get('cartToken')?.value

		if (!token) {
			token = crypto.randomUUID()
		}

		const userCart = await findOrCreateCart(token)
		const data = (await req.json()) as CreateCartItemValuesDTO
		// TODO пофиксить баг с добавлением одинаковой пиццы

		// const findCartArray = await prisma.cartItem.findMany({
		// 	where: {
		// 		cartId: userCart.id,
		// 		productVariationId: data.productVariationId,
		// 	},
		// 	include: {
		// 		ingredients: true,
		// 	},
		// })
		// if (data.ingredients!.length > 0) {
		// 	findCartArray.filter(item => console.log(item.ingredients.map(i => i.id)))
		// 	// findCartArray.map(item =>
		// 	// 	console.log(
		// 	// 		'find i',
		// 	// 		item.ingredients.map(i => i.id)
		// 	// 	)
		// 	// )
		// 	// console.log('data i', data.ingredients)
		// } else {
		// 	findCartArray.filter(
		// 		item => item.ingredients.length == data.ingredients?.length
		// 	)
		// }
		// console.log('find', findCartArray)
		// if (findCartArray.length > 0) {
		// 	await prisma.cartItem.update({
		// 		where: {
		// 			id: findCartArray[0].id,
		// 		},
		// 		data: {
		// 			quantity: findCartArray[0].quantity + 1,
		// 		},
		// 	})
		// } else {
		// 	//TODO точно игредиенты идут для обычных товаров
		// 	console.log('in create')
		// 	console.log(data)
		// 	await prisma.cartItem.create({
		// 		data: {
		// 			cartId: userCart.id,
		// 			productVariationId: data.productVariationId,
		// 			quantity: 1,
		// 			ingredients: { connect: data.ingredients?.map(id => ({ id })) },
		// 		},
		// 	})
		// }
		const findCartItem = await prisma.cartItem.findFirst({
			where: {
				cartId: userCart.id,
				productVariationId: data.productVariationId,
				ingredients: {
					every: {
						id: { in: data.ingredients },
					},
				},
			},
		})

		// Если товар был найден, делаем +1
		if (findCartItem) {
			await prisma.cartItem.update({
				where: {
					id: findCartItem.id,
				},
				data: {
					quantity: findCartItem.quantity + 1,
				},
			})
		} else {
			await prisma.cartItem.create({
				data: {
					cartId: userCart.id,
					productVariationId: data.productVariationId,
					quantity: 1,
					ingredients: { connect: data.ingredients?.map(id => ({ id })) },
				},
			})
		}

		const updatedUserCart = await updateCartTotalAmount(token)

		const resp = NextResponse.json(updatedUserCart)

		resp.cookies.set('cartToken', token, {
			maxAge: 60 * 60 * 24 * 3,
			httpOnly: true,
		})
		return resp
	} catch (error) {
		console.log('[CART_POST] Server error', error)
		return NextResponse.json(
			{ message: 'Не удалось создать корзину' },
			{ status: 500 }
		)
	}
}
