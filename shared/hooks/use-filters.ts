import { useSearchParams } from 'next/navigation'
import React from 'react'
import { useSet } from 'react-use'

interface PriceProps {
	priceFrom?: number
	priceTo?: number
}

interface QueryFilters extends PriceProps {
	selectedSizes: Set<string>
	selectedNoodles: Set<string>
	selectedIngredients: Set<string>
	price: PriceProps
}

interface ReturnedProps extends QueryFilters {
	setPrices: (name: keyof PriceProps, value: number) => void
	setIngredients: (key: string) => void
	setSizes: (key: string) => void
	setNoodles: (key: string) => void
}

export interface Filters {
	selectedSizes: Set<string>
	selectedNoodles: Set<string>
	selectedIngredients: Set<string>
	price: PriceProps
}

export const useFilters = (): ReturnedProps => {
	const searchParams = useSearchParams() as unknown as Map<
		keyof QueryFilters,
		string
	>

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(
		new Set<string>(searchParams.get('selectedIngredients')?.split(','))
	)

	const [selectedSizes, { toggle: toggleSizes }] = useSet(
		new Set<string>(
			searchParams.get('selectedSizes')
				? searchParams.get('selectedSizes')?.split(',')
				: []
		)
	)
	const [selectedNoodles, { toggle: toggleNoodles }] = useSet(
		new Set<string>(
			searchParams.get('selectedNoodles')
				? searchParams.get('selectedNoodles')?.split(',')
				: []
		)
	)
	const [price, setPrice] = React.useState<PriceProps>({
		priceFrom: Number(searchParams.get('priceFrom')) || undefined,
		priceTo: Number(searchParams.get('priceTo')) || undefined,
	})

	const onChangePrice = (name: keyof PriceProps, value: number) => {
		setPrice(prev => ({
			...prev,
			[name]: value,
		}))
	}

	return React.useMemo(
		() => ({
			selectedIngredients,
			selectedSizes,
			selectedNoodles,
			price,
			setPrices: onChangePrice,
			setIngredients: toggleIngredients,
			setSizes: toggleSizes,
			setNoodles: toggleNoodles,
		}),
		[selectedIngredients, selectedSizes, selectedNoodles, price]
	)
}
