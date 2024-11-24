import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { ProductWithRelations } from '@/@types/prisma'
import { cn } from '@/shared/lib/utils'
import { ProductVariation } from '@prisma/client'

interface Props {
	imageUrl: string //почему не целый обьект продукта ?
	name: string
	className?: string
	variations: ProductVariation[]
}

export const ChooseProductForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	variations,
}) => {
	return (
		<div className={cn('flex flex-1', className)}>
			<div
				className={'flex items-center justify-center flex-1 relative w-full'}
			>
				<img
					src={imageUrl}
					alt='logo'
					className={
						'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
					}
				/>
			</div>
			<div className={'p-7 bg-[#f5f5f5] w-[400px]'}>
				<Title className={'font-bold'} size={'sm'} text={name} />
				<Button className={'mt-10'} size={'lg'}>
					Добавить в корзину за {variations[0].price}
				</Button>
			</div>
		</div>
	)
}
