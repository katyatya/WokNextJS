import { prisma } from '@/prisma/prisma-client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET() {
	try {
		const users = await prisma.user.findMany()
		return NextResponse.json(users)
	} catch (err) {
		console.warn(err)
	}
}
export async function POST(req: NextRequest) {
	const data = await req.json()
	const user = await prisma.user.create({
		data,
	})
	return NextResponse.json(user)
}
