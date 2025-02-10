'use client'
import { useCategoryStore } from '@/shared/store/category'
import { cn } from '@/shared/lib/utils'
import { Category } from '@prisma/client'
import React from 'react'

interface Props {
	items: Category[]
	className?: string
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const categoryActiveId = useCategoryStore(state => state.activeId)

	return (
		<div
			className={cn(
				className,
				'inline-flex items-center bg-gray-50 rounded-2xl p-2'
			)}
		>
			{items.map(({ name, id }) => (
				<a
					className={cn(
						' flex items-center rounded-2xl px-4 h-11  max-[400px]:px-1 max-[400px]:text-sm',
						categoryActiveId === id && 'bg-white text-primary shadow-gray-50'
					)}
					key={id}
					href={`/#${name}`}
				>
					<button>{name}</button>
				</a>
			))}
		</div>
	)
}
