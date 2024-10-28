import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { Button } from '../ui'
import { ArrowRight, ShoppingCart, User } from 'lucide-react'
import { SearchInput } from '.'

interface Props {
	className?: string
}

export const Header: React.FC<Props> = ({ className }) => {
	return (
		<header className={cn('border border-b', className)}>
			<Container className='flex items-center justify-between py-8'>
				<Link href='/'>
					<div className='flex items-center gap-3'>
						<Image src='/geisha.png' alt='logo' width={80} height={80} />
						<div>
							<h1 className='text-2xl uppercase font-black'>Wok</h1>
							<p className='text-sm text-gray-400 leading-3'>Master</p>
						</div>
					</div>
				</Link>
				<div className='mx-16 flex-1'>
					<SearchInput />
				</div>

				<div className='flex items-center gap-2'>
					<Button variant='outline' className='flex items-center gap-1'>
						<User size={15} />
						Войти
					</Button>

					<div>
						<Button className='group relative'>
							<b>520 p</b>
							<span className='bg-white/30 h-full mx-3 w-[1px]' />
							<div className='flex items-center gap-2 transition duration-300 group-hover:opacity-0'>
								<ShoppingCart className='h-4 w-4 relative' strokeWidth={2} />
								<b>3</b>
							</div>
							<ArrowRight className='absolute right-5 transition duration-300 -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0' />
						</Button>
					</div>
				</div>
			</Container>
		</header>
	)
}
