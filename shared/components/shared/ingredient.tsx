import { cn } from '@/shared/lib/utils'
import { CircleCheck } from 'lucide-react'
import React from 'react'

interface Props {
	imageUrl: string
	name: string
	price: number
	active?: boolean
	onClick?: () => void
	className?: string
}

export const IngredientItem: React.FC<Props> = ({
	className,
	active,
	price,
	name,
	imageUrl,
	onClick,
}) => {
	return (
		<div
			className={cn(
				'flex items-center flex-col p-1 rounded-md lg:w-32 md:w-24 max-sm:max-w-32 text-center relative cursor-pointer shadow-md bg-white',
				{ 'border border-primary': active },
				className
			)}
			onClick={onClick}
		>
			{active && (
				<CircleCheck className='absolute top-2 right-2 text-primary' />
			)}
			<img className='w-[110px] max-sm:w-[70px]' src={imageUrl} />
			<span className='text-xs mb-1'>{name}</span>
			<span className='font-bold'>{price} ₽</span>
		</div>
	)
}
