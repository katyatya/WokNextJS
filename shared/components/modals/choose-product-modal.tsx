'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '../ui'
import { DialogContent } from '../ui/dialog'
import { cn } from '@/shared/lib/utils'
import { ChooseProductForm, ChooseWokForm } from '../shared'
import { ProductWithRelations } from '@/@types/prisma'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	const isWokForm = Boolean(product.variations[0].wokType)

	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden',
					className
				)}
			>
				{isWokForm ? (
					<ChooseWokForm imageUrl={product.imageUrl} name={product.name} />
				) : (
					<ChooseProductForm imageUrl={product.imageUrl} name={product.name} />
				)}
			</DialogContent>
		</Dialog>
	)
}
