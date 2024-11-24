import { PrismaClient } from '@prisma/client'

import { hashSync } from 'bcrypt'

const prisma = new PrismaClient()

async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User',
				email: 'user@test.mail',
				password: hashSync('1111', 10),
				verified: new Date(),
				role: 'USER',
			},
			{
				fullName: 'Admin',
				email: 'user2@test.mail',
				password: hashSync('1111', 10),
				verified: new Date(),
				role: 'ADMIN',
			},
		],
	})

	await prisma.category.createMany({
		data: [
			{
				name: 'Пшеничная лапша',
			},
			{
				name: 'Гречневая лапша',
			},
			{
				name: 'Яичная лапша',
			},
			{
				name: 'Фунчоза',
			},
			{
				name: 'Напитки',
			},
		],
	})

	await prisma.ingredient.createMany({
		data: [
			{
				name: 'Болгарский перец',
				price: 60,
				imageUrl: '/pepper.png',
			},
			{
				name: 'Халапеньо',
				price: 70,
				imageUrl: '/jalapeno.png',
			},
			{
				name: 'Шампиньоны',
				price: 70,
				imageUrl: '/mashroom.png',
			},
			{
				name: 'Говядина',
				price: 159,
				imageUrl: '',
			},
			{
				name: 'Свинина',
				price: 109,
				imageUrl: '',
			},
			{
				name: 'Куриная грудка',
				price: 109,
				imageUrl: '/chiken.png',
			},
			{
				name: 'Креветки',
				price: 209,
				imageUrl: '/shrimp.png',
			},
			{
				name: 'Лук',
				price: 100,
				imageUrl: '/onion.png',
			},
		],
	})

	const wok1 = await prisma.product.create({
		data: {
			name: 'Удон с курицей',
			imageUrl: '/udon_chiken.jpg',
			categoryId: 1,
			ingredients: {
				connect: [
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
					{ id: 4 },
					{ id: 7 },
					{ id: 8 },
				],
			},
		},
	})
	const wok2 = await prisma.product.create({
		data: {
			name: 'Удон с говядиной',
			imageUrl: '/udon_chiken.jpg',
			categoryId: 1,
			ingredients: {
				connect: [
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
					{ id: 4 },
					{ id: 5 },
					{ id: 8 },
				],
			},
		},
	})

	const wok3 = await prisma.product.create({
		data: {
			name: 'Удон с овощами',
			imageUrl: '/udon_chiken.jpeg',
			categoryId: 1,
			ingredients: {
				connect: [
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
					{ id: 4 },
					{ id: 5 },
					{ id: 6 },
					{ id: 7 },
					{ id: 8 },
				],
			},
		},
	})
	const wok4 = await prisma.product.create({
		data: {
			name: 'Удон с овощами',
			imageUrl: '/udon_chiken.jpeg',
			categoryId: 2,
			ingredients: {
				connect: [
					{ id: 1 },
					{ id: 2 },
					{ id: 3 },
					{ id: 4 },
					{ id: 5 },
					{ id: 6 },
					{ id: 7 },
					{ id: 8 },
				],
			},
		},
	})
	const lit = await prisma.product.create({
		data: {
			name: 'LitEnergy',
			imageUrl: '/lit_zeroshugar.png',
			categoryId: 3,
		},
	})

	await prisma.productVariation.createMany({
		data: [
			//wok1
			{
				productId: wok1.id,
				size: 'S',
				wokType: 1,
				price: 350,
			},
			{
				productId: wok1.id,
				size: 'S',
				wokType: 2,
				price: 380,
			},
			{
				productId: wok1.id,
				size: 'M',
				wokType: 1,
				price: 480,
			},
			{
				productId: wok1.id,
				size: 'M',
				wokType: 2,
				price: 490,
			},
			//wok2
			{
				productId: lit.id,
				price: 120,
			},
			{
				productId: wok2.id,
				size: 'S',
				wokType: 1,
				price: 370,
			},
			{
				productId: wok2.id,
				size: 'M',
				wokType: 1,
				price: 490,
			},
			//wok3
			{
				productId: wok3.id,
				size: 'S',
				wokType: 1,
				price: 290,
			},

			{
				productId: wok3.id,
				size: 'M',
				wokType: 1,
				price: 350,
			},
			{
				productId: wok4.id,
				size: 'S',
				wokType: 1,
				price: 290,
			},

			{
				productId: wok4.id,
				size: 'S',
				wokType: 1,
				price: 350,
			},
		],
	})

	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 0,
				token: '12345',
			},
			{
				userId: 2,
				totalAmount: 0,
				token: '54321',
			},
		],
	})

	await prisma.cartItem.create({
		data: {
			productVariationId: 1,
			cartId: 1,
			quantity: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }],
			},
		},
	})
}

async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductVariation" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE;`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE;`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.error(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
