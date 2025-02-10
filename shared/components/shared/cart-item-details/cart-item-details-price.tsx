import { cn } from '@/shared/lib/utils'

interface Props {
	value: number
	className?: string
}

export const CartItemDetailsPrice: React.FC<Props> = ({ value, className }) => {
	return (
		<h2 className={cn('font-bold max-sm:text-[14px]', className)}>{value} ₽</h2>
	)
}
