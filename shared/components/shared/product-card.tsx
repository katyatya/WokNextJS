import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { Plus } from 'lucide-react'

interface Props {
	className?: string
	imageUrl: string
	name: string
	price: number
	id: number
}

export const ProductCard: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	price,
	id,
}) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>
					<Image src={imageUrl} alt={name} width={200} height={200} />
				</div>
				<Title text={name} className='font-bold my-2 ' />

				<p>
					Oписание товара со всяким содержимым.... тут важная инфа ля ля ля{' '}
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
