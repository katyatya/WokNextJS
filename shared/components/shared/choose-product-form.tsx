import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { ProductWithRelations } from '@/@types/prisma'
import { cn } from '@/shared/lib/utils'
import { ProductVariation } from '@prisma/client'

interface Props {
	imageUrl: string
	name: string
	className?: string
	variations: ProductVariation[]
	loading: boolean
	onSubmit?: VoidFunction
}

export const ChooseProductForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	variations,
	loading,
	onSubmit,
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
						'relative left-2 top-2 transition-all z-10 duration-300  w-[350px] h-[350px] max-sm:h-[200px] max-sm:w-[200px]'
					}
				/>
			</div>
			<div className={'p-7 bg-[#f5f5f5] w-[400px] max-sm:w-[220px]'}>
				<Title className={'font-bold'} size={'sm'} text={name} />
				<Button
					loading={loading}
					className={' w-full mt-10 max-sm:mt-4 max-sm:text-xs'}
					size={'lg'}
					onClick={() => onSubmit?.()}
				>
					Добавить в корзину за {variations[0].price}
				</Button>
			</div>
		</div>
	)
}
