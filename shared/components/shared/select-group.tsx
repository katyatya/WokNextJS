'use client'
import { cn } from '@/shared/lib/utils'
import React from 'react'
type Variant = {
	name: string
	value: string
	disabled?: boolean
}
interface Props {
	className?: string
	items: readonly Variant[]
	onClick?: (value: Variant['value']) => void
	selectedValue?: Variant['value']
}

export const SelectGroup: React.FC<Props> = ({
	items,
	onClick,
	selectedValue,
	className,
}) => {
	return (
		<div
			className={cn(
				className,
				'flex justify-between rounded-lg bg-[#F3F3F7] select-none p-1'
			)}
		>
			{items.map(item => (
				<button
					key={item.name}
					onClick={() => onClick?.(item.value)}
					className={cn(
						'flex items-center justify-center h-[30px] px-5 flex-1 rounded-2xl transition-all duration-300 text-sm',
						{
							'bg-white shadow': item.value === selectedValue,
							'text-gray-500 opacity-50 pointer-events-none': item.disabled,
						}
					)}
				>
					{item.name}
				</button>
			))}
		</div>
	)
}
