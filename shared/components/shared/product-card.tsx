import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'
import { Ingredient } from '@prisma/client'

interface Props {
	className?: string
	imageUrl: string
	name: string
	price: number
	id: number
	ingredients?: Ingredient[]
}

export const ProductCard: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	price,
	id,
	ingredients,
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<Image src={imageUrl} alt={name} width={200} height={200} />
				</div>
				<Title text={name} className='font-bold my-2 ' />

				<p className='break-all text-gray-400'>
					{ingredients?.map(ingredient => ingredient.name).join(' , ')}
				</p>

				<div>
					<span className='text-[20px]'>
						от <b>{price}</b>
					</span>
					<Button
						variant='secondary'
						className='text-base font-bold text-primary'
					>
						<Plus size={15} />
						<p>Добавить</p>
					</Button>
				</div>
			</Link>
		</div>
	)
}
