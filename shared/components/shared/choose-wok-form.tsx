import React from 'react'

import { Title } from './title'
import { Button } from '../ui'
import { IngredientItem, SelectGroup, WokImage } from '.'
import {
	WokSize,
	wokSizes,
	WokType,
	WokTypes,
	mapWokType,
} from '@/shared/constans/wok'
import { Ingredient, ProductVariation } from '@prisma/client'

import { cn } from '@/shared/lib/utils'
import { useSet } from 'react-use'
import { calcTotalPrice } from '@/shared/lib/calc-wok-total-price'

interface Props {
	imageUrl: string //почему не целый обьект продукта ?
	name: string
	ingredients: Ingredient[]
	variations: ProductVariation[]
	onSubmit: (itemId: number, ingredients: number[]) => void
	className?: string
	loading: boolean
}

export const ChooseWokForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	ingredients,
	variations,
	loading,
	onSubmit,
}) => {
	const [size, setSize] = React.useState<WokSize>('M')
	const [type, setType] = React.useState<WokType>(1)
	const [selectedIngredientId, { toggle: changeIngredient }] = useSet(
		new Set<number>([])
	)

	const totalPrice = calcTotalPrice({
		variations,
		size,
		ingredients,
		selectedIngredientId,
	})

	let grams = size == 'S' ? 250 : 320

	const description = `${mapWokType[type]} ${grams} г`

	const availableWokTypes: number[] = variations.map(
		variation => variation.wokType
	) as number[]
	const finalWokTypes = WokTypes.map(item =>
		item.value in availableWokTypes
			? { ...item, disabled: false }
			: { ...item, disabled: true }
	)

	const currentItemId = variations.find(
		item => item.wokType === type && item.size === size
	)?.id

	const handleClickAdd = () => {
		if (currentItemId) {
			onSubmit(currentItemId, Array.from(selectedIngredientId))
		}
	}

	return (
		<div className={cn('flex flex-1 max-sm:flex-col h-[90vh] ', className)}>
			<WokImage imageUrl={imageUrl} size={size} />
			<div
				className={
					'p-7 bg-[#f5f5f5] w-[500px] lg:w-[500px] md:w-[400px] sm:w-[350px] max-sm:w-full max-sm:h-[100%] max-sm:p-2'
				}
			>
				<Title className={'font-bold'} size={'sm'} text={name} />
				<p className={'text-gray-500'}>{description}</p>
				<div className={'flex flex-col gap-3 max-sm:gap-1 mt-7 max-sm:mt-3'}>
					<SelectGroup
						items={wokSizes}
						selectedValue={size}
						onClick={value => setSize(value as WokSize)}
					/>
					<SelectGroup
						items={finalWokTypes}
						selectedValue={String(type)}
						onClick={value => setType(Number(value) as WokType)}
					/>
				</div>
				<div
					className={
						'bg-gray-50 p-5 rounded-md max-h-[280px] max-[400px]:max-h-[130px] overflow-auto scrollbar mt-7'
					}
				>
					<div className={'grid grid-cols-3 gap-4 max-sm:gap-1'}>
						{ingredients?.map(ingredient => (
							<IngredientItem
								key={ingredient.id}
								imageUrl={ingredient.imageUrl}
								name={ingredient.name}
								price={ingredient.price}
								onClick={() => changeIngredient(ingredient.id)}
								active={selectedIngredientId.has(ingredient.id)}
							/>
						))}
					</div>
				</div>
				<Button
					loading={loading}
					className={'mt-7 text-lg '}
					size={'lg'}
					onClick={handleClickAdd}
				>
					Добавить в корзину за {totalPrice}₽
				</Button>
			</div>
		</div>
	)
}
