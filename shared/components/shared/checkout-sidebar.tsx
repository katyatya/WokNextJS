import { ArrowRight, Package, SquarePercent, Truck } from 'lucide-react'
import { CheckoutItemDetails, WhiteBlock } from '.'
import { Button } from '../ui'
const DELIVERY_PRICE = 295
const VAT = 79

interface Props {
	totalAmount: number
	className?: string
}
export const CheckoutSidebar: React.FC<Props> = ({ totalAmount }) => {
	const totalPrice = totalAmount + DELIVERY_PRICE + VAT
	return (
		<WhiteBlock className='p-6 sticky top-4'>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				<span className='text-3xl font-extrabold'>{totalPrice} ₽</span>
			</div>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package className='mr-2' size={16} />
						Стоимость товаров:
					</div>
				}
				value={totalAmount}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<SquarePercent className='mr-2' size={16} />
						Сервисный сбор:
					</div>
				}
				value={VAT}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck className='mr-2' size={16} />
						Доставка:
					</div>
				}
				value={DELIVERY_PRICE}
			/>
			<Button className='w-full text-base h-12 mt-4' type='submit'>
				Перейти к оплате <ArrowRight size={16} className='ml-3' />
			</Button>
		</WhiteBlock>
	)
}
