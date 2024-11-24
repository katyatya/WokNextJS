import { mapWokType, WokSize, WokType } from '../constans/wok'

export const getCartItemDetails = (
	ingredients: Array<{ name: string; price: number }>,
	wokType?: WokType,
	wokSize?: WokSize
): string => {
	const details = []

	if (wokType && wokSize) {
		const typeName = mapWokType[wokType]
		details.push(`${typeName} ${wokSize} см`)
	}

	if (ingredients) {
		details.push(...ingredients.map(ingredient => ingredient.name))
	}

	return details.join(', ')
}
