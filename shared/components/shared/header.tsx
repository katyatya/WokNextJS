'use client'

import { cn } from '@/shared/lib/utils'
import Link from 'next/link'
import React from 'react'
import { Container } from './container'
import Image from 'next/image'
import { AuthModal, CartButton, ProfileButton, SearchInput } from '.'
import { useRouter, useSearchParams } from 'next/navigation'
import toast from 'react-hot-toast'

interface Props {
	className?: string
	hasSearchAndCart?: boolean
}

export const Header: React.FC<Props> = ({
	className,
	hasSearchAndCart = true,
}) => {
	const [openAuthModal, setOpenAuthModal] = React.useState(false)
	const router = useRouter()
	const searchParams = useSearchParams()

	React.useEffect(() => {
		let toastMessage = ''

		if (searchParams.has('paid')) {
			toastMessage = 'Заказ успешно оплачен! Информация отправлена на почту.'
		}

		if (searchParams.has('verified')) {
			toastMessage = 'Почта успешно подтверждена!'
		}

		if (toastMessage) {
			setTimeout(() => {
				router.replace('/')
				toast.success(toastMessage, {
					duration: 3000,
				})
			}, 1000)
		}
	}, [])
	return (
		<header className={cn(' border-b', className)}>
			<Container className='flex items-center justify-between py-8 '>
				<Link href='/'>
					<div className='flex items-center gap-3'>
						<Image
							src='/noodle.png'
							alt='logo'
							width={80}
							height={80}
							className='max-[410px]:w-[50px]'
						/>
						<div>
							<h1 className='text-2xl max-[410px]:text-base uppercase font-black'>
								Wok
							</h1>
							<p className='text-sm text-gray-400 leading-3'>Master</p>
						</div>
					</div>
				</Link>
				{hasSearchAndCart && (
					<div className=' flex-1'>
						<SearchInput />
					</div>
				)}
				<div className='flex items-center gap-2'>
					<ProfileButton
						onClickSignIn={() => setOpenAuthModal(true)}
						className='max-[410px]:'
					/>
					<AuthModal
						open={openAuthModal}
						onClose={() => setOpenAuthModal(false)}
					/>
					{hasSearchAndCart && (
						<div>
							<CartButton />
						</div>
					)}
				</div>
			</Container>
		</header>
	)
}
