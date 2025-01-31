import { prisma } from '@/prisma/prisma-client'

export interface GetSearchParams {
	query?: string
	sortBy?: string
	selectedNoodles?: string
	selectedIngredients?: string
	priceFrom?: string
	priceTo?: string
}
const DEFAULT_MIN_PRICE = 0
const DEFAULT_MAX_PRICE = 1000
export const findWoks = async (params: GetSearchParams) => {
	const selectedNoodles = params.selectedNoodles?.split(',').map(Number)
	const ingredientsIdArr = params.selectedIngredients?.split(',').map(Number)

	const minPrice = Number(params.priceFrom) || DEFAULT_MIN_PRICE
	const maxPrice = Number(params.priceTo) || DEFAULT_MAX_PRICE

	const categories = await prisma.category.findMany({
		include: {
			products: {
				orderBy: {
					id: 'desc',
				},
				where: {
					ingredients: ingredientsIdArr
						? {
								some: {
									id: {
										in: ingredientsIdArr,
									},
								},
						  }
						: undefined,
					categoryId: {
						in: selectedNoodles,
					},
					variations: {
						some: {
							price: {
								gte: minPrice, // >=
								lte: maxPrice, // <=
							},
						},
					},
				},
				include: {
					ingredients: true,
					variations: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	})

	return categories
}
