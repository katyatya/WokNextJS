'use client'

import React from 'react'
import { CheckboxFilter, Title } from '.'
import { Input, RangeSlider } from '../ui'
import { useQueryFilters, useFilters, useIngredients } from '@/shared/hooks'
import { cn } from '@/shared/lib/utils'

interface Props {
	className?: string
}

export const Filters: React.FC<Props> = ({ className }) => {
	const { loading, ingredients } = useIngredients()
	const filters = useFilters()
	useQueryFilters(filters)
	const updatePrices = (prices: number[]) => {
		filters.setPrices('priceFrom', prices[0])
		filters.setPrices('priceTo', prices[1])
	}

	return (
		<div className={cn(className)}>
			<Title text='Фильтрация' size='sm' className='font-bold ' />

			<CheckboxFilter
				title='Вид лапши'
				className='mb-5'
				onClickCheckbox={filters.setNoodles}
				selectedValues={filters.selectedNoodles}
				items={[
					{ text: 'Пшеничная', value: '1' },
					{ text: 'Яичная', value: '2' },
					{ text: 'Гречневая', value: '3' },
					{ text: 'Фунчоза', value: '4' },
				]}
			/>

			<div className='mt-7 mb-12'>
				<p className='font-bold'>Цена</p>
				<div className='flex  py-4'>
					<Input
						type='number'
						placeholder='0'
						min={0}
						max={100}
						value={filters.price.priceFrom}
						onChange={e =>
							filters.setPrices('priceFrom', Number(e.target.value))
						}
					/>
					<Input
						type='number'
						placeholder='1000'
						min={100}
						max={1000}
						value={filters.price.priceTo}
						onChange={e => filters.setPrices('priceTo', Number(e.target.value))}
					/>
				</div>
				<RangeSlider
					min={0}
					max={1000}
					step={10}
					value={[filters.price.priceFrom || 0, filters.price.priceTo || 1000]}
					onValueChange={updatePrices}
				/>
			</div>

			<CheckboxFilter
				title='Ингредиенты'
				className='my-10'
				defaultValue={ingredients.slice(0, 5)}
				items={ingredients}
				loading={loading}
				onClickCheckbox={filters.setIngredients}
				selectedValues={filters.selectedIngredients}
			/>
		</div>
	)
}
