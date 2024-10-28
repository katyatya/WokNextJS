'use client'

import React from 'react'
import { FilterChecboxProps, FilterCheckbox } from './filter-checkbox'
import { Input } from '../ui'
import { Skeleton } from '../ui/skeleton'

interface Props {
	title: string
	items: FilterChecboxProps[]
	limit?: number
	loading?: boolean
	selectedValues?: Set<string>
	searchInputPlaceholder?: string
	onClickCheckbox?: (id: string) => void
	defaultValue?: FilterChecboxProps[]
	className?: string
}

export const CheckboxFilter: React.FC<Props> = ({
	title,
	items,
	limit = 5,
	searchInputPlaceholder = 'Поиск....',
	className,
	onClickCheckbox,
	defaultValue,
	selectedValues,
	loading,
}) => {
	const [showAll, setShowAll] = React.useState(false)
	const [searchValue, setSearchValue] = React.useState('')

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold my-4'>{title}</p>
				{Array(limit)
					.fill(0)
					.map((_, index) => (
						<Skeleton key={index} className='h-6 mb-4 rounded-[5px]' />
					))}
			</div>
		)
	}
	const list = showAll
		? items.filter(item =>
				item.text.toLowerCase().includes(searchValue.toLowerCase())
		  )
		: (defaultValue || items).slice(0, limit)

	const changeSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		return setSearchValue(e.target.value)
	}

	return (
		<>
			<p className='font-bold mt-5 mb-4'>{title}</p>
			{showAll && (
				<div className={className}>
					<Input
						onChange={changeSearchInput}
						placeholder={searchInputPlaceholder}
						className='bg-gray-50 border-none'
					/>
				</div>
			)}
			<div className='flex flex-col gap-4 max-h-44 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox
						text={item.text}
						value={item.value}
						endAdornment={item.endAdornment}
						checked={selectedValues?.has(item.value)}
						onCheckedChange={() => onClickCheckbox?.(item.value)}
						name={item.text}
						key={index}
					/>
				))}
			</div>

			{items.length > limit ? (
				<div>
					<button
						onClick={() => {
							setShowAll(!showAll)
						}}
						className='text-primary mt-4'
					>
						{showAll ? 'Скрыть' : '+ Показать все'}
					</button>
				</div>
			) : (
				''
			)}
		</>
	)
}
