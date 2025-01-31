'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { Dialog } from '../ui'
import { DialogContent } from '../ui/dialog'
import { cn } from '@/shared/lib/utils'
import { ProductsForm } from '../shared'
import { ProductWithRelations } from '@/@types/prisma'

interface Props {
	product: ProductWithRelations
	className?: string
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter()
	return (
		<Dialog open={Boolean(product)} onOpenChange={() => router.back()}>
			<DialogContent
				className={cn(
					'p-0  max-w-[1060px] bg-white overflow-hidden',
					className
				)}
			>
				<ProductsForm product={product} />
			</DialogContent>
		</Dialog>
	)
}
