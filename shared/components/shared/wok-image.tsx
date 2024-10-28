import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	className?: string
	imageUrl: string
	size: string
}

export const WokImage: React.FC<Props> = ({ imageUrl, size, className }) => {
	return (
		<div
			className={cn(
				className,
				'flex items-center justify-center flex-1 relative w-full'
			)}
		>
			<img
				src={imageUrl}
				alt='logo'
				className={cn(
					'relative left-2 top-2 transition-all z-10 duration-300',
					{
						'w-[300px] h-[300px]': size === 'S',
						'w-[400px] h-[400px]': size === 'M',
					}
				)}
			/>
		</div>
	)
}
