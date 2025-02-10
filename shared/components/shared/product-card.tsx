import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
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
				<div className='flex justify-around items-center p-1  rounded-lg h-[220px] max-sm:h-[220px] max-[400px]:[200px]'>
					<Image src={imageUrl} alt={name} width={200} height={200} />
				</div>
				<Title
					text={name}
					className='font-bold my-2 max-sm:my-1  max-[400px]:text-[20px]'
				/>

				<p className='break-all text-gray-400 pr-2 max-[400px]:hidden'>
					{ingredients?.map(ingredient => ingredient.name).join(' , ')}
				</p>

				<div className='flex justify-between'>
					<span className='text-[20px]  max-[400px]:text-[18px]'>
						от <b>{price}</b>
					</span>
					<Button
						variant='secondary'
						className='text-base font-bold text-primary hover:bg-orange-100'
					>
						<p>Добавить</p>
					</Button>
				</div>
			</Link>
		</div>
	)
}
