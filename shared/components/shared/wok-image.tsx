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
					'relative left-2 top-2 max-sm:top-0 transition-all z-10 duration-300 ',
					{
						'lg:w-[300px] md:w-[250px] sm:w-[230px] max-sm:w-[180px] ]':
							size === 'S',
						'lg:w-[400px] md:w-[350px] sm:w-[280px]  max-sm:w-[200px]':
							size === 'M',
					}
				)}
			/>
		</div>
	)
}
