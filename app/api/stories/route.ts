import { prisma } from '@/prisma/prisma-client'
import { NextResponse } from 'next/server'

export async function GET() {
	try {
		const data = await prisma.story.findMany({
			include: {
				items: true,
			},
		})
		return NextResponse.json(data)
	} catch (error) {
		console.warn(error)
	}
}
