import { cn } from '@/shared/lib/utils'
import React from 'react'
import { Container } from './container'
import { Categories } from './categories'
import { SortPopup } from './popup'
import { Category } from '@prisma/client'

interface Props {
	categories: Category[]
	className?: string
}

export const TopBar: React.FC<Props> = ({ categories, className }) => {
	return (
		<div className={cn('sticky top-0 p-2 shadow-lg shadow-black/5', className)}>
			<Container>
				<Categories items={categories} />
				<SortPopup />
			</Container>
		</div>
	)
}