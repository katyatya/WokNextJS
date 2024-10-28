import { Api } from '@/services/api-client'
import { Ingredient } from '@prisma/client'
import React from 'react'

export const useIngredients = () => {
	const [items, setItems] = React.useState<Ingredient[]>([])
	const [loading, setLoading] = React.useState(true)

	React.useEffect(() => {
		async function fetchIngredients() {
			try {
				setLoading(true)
				const ingredients = await Api.ingredients.getAll()
				setItems(ingredients)
			} catch (error) {
				console.warn(error)
			} finally {
				setLoading(false)
			}
		}
		fetchIngredients()
	}, [])

	const ingredients = items.map(item => ({
		value: String(item.id),
		text: item.name,
	}))
	return {
		ingredients,
		loading,
	}
}
