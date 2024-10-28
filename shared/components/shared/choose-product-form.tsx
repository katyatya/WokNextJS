import React from 'react'
import { Title } from './title'
import { Button } from '../ui'

interface Props {
	imageUrl: string //почему не целый обьект продукта ?
	name: string
	className?: string
}

export const ChooseProductForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
}) => {
	const description = 'S неострая 250г'
	const totalPrice = 350
	return (
		<div className={'flex flex-1'}>
			<div
				className={'flex items-center justify-center flex-1 relative w-full'}
			>
				<img
					src={imageUrl}
					alt='logo'
					className={
						'relative left-2 top-2 transition-all z-10 duration-300 w-[350px] h-[350px]'
					}
				/>
			</div>
			<div className={'p-7 bg-[#f5f5f5] w-[400px]'}>
				<Title className={'font-bold'} size={'sm'} text={name} />
				<p className={'text-gray-500'}>{description}</p>
				<Button className={'mt-10'} size={'lg'}>
					Добавить в корзину за {totalPrice}
				</Button>
			</div>
		</div>
	)
}
