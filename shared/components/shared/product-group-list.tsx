'use client'

import React from 'react'
import { Title } from './title'
import { cn } from '@/shared/lib/utils'
import { ProductCard } from '.'
import { useIntersection } from 'react-use'
import { useCategoryStore } from '@/shared/store/category'
import { ProductWithRelations } from '@/@types/prisma'

interface Props {
	title: string
	items: ProductWithRelations[]
	categoryId: number
	className?: string
	listClassName?: string
}

export const ProductGroupList: React.FC<Props> = ({
	title,
	items,
	categoryId,
	className,
	listClassName,
}) => {
	const setActiveCategoryId = useCategoryStore(state => state.setActiveId)
	const intersectionRef = React.useRef(null)
	const intersection = useIntersection(intersectionRef, {
		threshold: 0.4,
	})

	React.useEffect(() => {
		if (intersection?.isIntersecting) {
			setActiveCategoryId(categoryId)
		}
	}, [categoryId, intersection?.isIntersecting])

	return (
		<div className={className} id={title} ref={intersectionRef}>
			<Title
				text={title}
				size='lg'
				className='font-extrabold mb-5 max-[400px]:mb-0'
			/>
			<div
				className={cn(
					'grid grid-cols-3 max-sm:place-items-center max-[400px]:items-start md:grid-cols-2 lg:grid-cols-3 max-sm:grid-cols-2 gap-6 max-sm:gap-2 mx-2',
					listClassName
				)}
			>
				{items.map(product => (
					<ProductCard
						key={product.id}
						id={product.id}
						name={product.name}
						price={product.variations[0].price}
						imageUrl={product.imageUrl}
						ingredients={product.ingredients}
						className={'max-w-[260px] max-sm:max-w-[180px]'}
					/>
				))}
			</div>
		</div>
	)
}
