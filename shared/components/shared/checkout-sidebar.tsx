import { ArrowRight, Package, SquarePercent, Truck } from 'lucide-react'
import { CheckoutItemDetails, WhiteBlock } from '.'
import { Button } from '../ui'
import { Skeleton } from '../ui/skeleton'
import { cn } from '@/shared/lib/utils'

const DELIVERY_PRICE = 295
const VAT = 79

interface Props {
	totalAmount: number
	className?: string
	loading?: boolean
}
export const CheckoutSidebar: React.FC<Props> = ({
	totalAmount,
	loading,
	className,
}) => {
	const totalPrice = totalAmount + DELIVERY_PRICE + VAT
	return (
		<WhiteBlock className={cn('p-6 sticky top-4', className)}>
			<div className='flex flex-col gap-1'>
				<span className='text-xl'>Итого:</span>
				{loading ? (
					<Skeleton className='h-11' />
				) : (
					<span className='h-11 text-3xl font-extrabold'>{totalPrice} ₽</span>
				)}
			</div>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Package className='mr-2' size={16} />
						Стоимость товаров:
					</div>
				}
				value={
					loading ? <Skeleton className='h-7 w-10' /> : <p>{totalAmount} </p>
				}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<SquarePercent className='mr-2' size={16} />
						Сервисный сбор:
					</div>
				}
				value={loading ? <Skeleton className='h-7 w-10' /> : <p>{VAT} </p>}
			/>
			<CheckoutItemDetails
				title={
					<div className='flex items-center'>
						<Truck className='mr-2' size={16} />
						Доставка:
					</div>
				}
				value={
					loading ? <Skeleton className='h-7 w-10' /> : <p>{DELIVERY_PRICE} </p>
				}
			/>
			<Button
				className='w-full text-base h-12 mt-4'
				type='submit'
				loading={loading}
			>
				Перейти к оплате <ArrowRight size={16} className='ml-3' />
			</Button>
		</WhiteBlock>
	)
}
