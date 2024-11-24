import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	try {
		const userId = 1
		const token = req.cookies.get('cartToken')?.value || '12345'
		if (!token) {
			return NextResponse.json({ totalAmount: 0, items: [] })
		}

		const userCart = await prisma.cart.findFirst({
			where: {
				OR: [
					{
						userId,
					},
					{ token },
				],
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
		console.log(error)
	}
}
