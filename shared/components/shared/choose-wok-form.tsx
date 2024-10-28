import React from 'react'
import { Title } from './title'
import { Button } from '../ui'
import { WokImage } from '.'

interface Props {
	imageUrl: string //почему не целый обьект продукта ?
	name: string
	ingredients?: any[]
	variations?: any[]
	className?: string
}

export const ChooseWokForm: React.FC<Props> = ({
	className,
	imageUrl,
	name,
	ingredients,
	variations,
}) => {
	const description = 'S неострая 250г'
	const totalPrice = 350
	return (
		<div className={'flex flex-1'}>
			<WokImage imageUrl={imageUrl} size={'S'} />
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
