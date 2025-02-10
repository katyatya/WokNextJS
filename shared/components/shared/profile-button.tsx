import { useSession } from 'next-auth/react'
import React from 'react'
import { Button } from '../ui/button'
import { CircleUser, User } from 'lucide-react'
import Link from 'next/link'

interface Props {
	onClickSignIn?: () => void
	className?: string
	loading?: boolean
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSignIn,
	loading,
}) => {
	const { data: session } = useSession()

	return (
		<div className={className}>
			{!session ? (
				<Button
					onClick={onClickSignIn}
					variant='outline'
					className='flex items-center gap-1 max-[400px]:gap-0 max-[400px]:text-xs'
					loading={loading}
				>
					<User size={16} />
					Войти
				</Button>
			) : (
				<Link href='/profile'>
					<Button
						variant='secondary'
						className='flex items-center gap-2  max-[400px]:gap-0 max-[400px]:text-xs'
						loading={loading}
					>
						<CircleUser size={18} />
						Профиль
					</Button>
				</Link>
			)}
		</div>
	)
}
