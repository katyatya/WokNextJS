import { Ingredient, ProductVariation } from '@prisma/client'
import React from 'react'
import { WokSize } from '../constans/wok'

interface Props {
	variations: ProductVariation[]
	size: WokSize
	ingredients: Ingredient[]
	selectedIngredientId: Set<number>
}

/**
 * Функция для подсчета общей стоимости вока
 *
 * @param size - размер вока
 * @param variations - список вариаций вока
 * @param ingredients - список ингредиентов
 * @param selectedIngredientId - список id выбранных доп ингредиентов
 * @returns number общую стоимость
 */

export const calcTotalPrice: React.FC<Props> = ({
	variations,
	size,
	ingredients,
	selectedIngredientId,
}) => {
	const sizePrice = variations.find(variation => variation.size == size)?.price
	const ingredientsPrice = ingredients
		?.filter(ingredient => selectedIngredientId.has(ingredient.id))
		.reduce((acc, ingredient) => acc + ingredient.price, 0)
	return ingredientsPrice + Number(sizePrice)
}
