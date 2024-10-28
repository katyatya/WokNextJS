import React from 'react'
import { Filters } from './use-filters'
import qs from 'qs'
import { useRouter } from 'next/navigation'

export const useQueryFilters = (filters: Filters) => {
	const router = useRouter()
	React.useEffect(() => {
		const params = {
			...filters.price,
			selectedSizes: Array.from(filters.selectedSizes),
			selectedNoodles: Array.from(filters.selectedNoodles),
			selectedIngredients: Array.from(filters.selectedIngredients),
		}
		const query = qs.stringify(params, {
			arrayFormat: 'comma',
		})
		router.push(`?${query}`, {
			scroll: false,
		})
	}, [filters, router])
}
