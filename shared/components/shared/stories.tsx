'use client'

import { Api } from '@/services/api-client'
import { IStory } from '@/services/stories'
import React from 'react'
import { Container } from './container'
import { cn } from '@/shared/lib/utils'
import { X } from 'lucide-react'
import ReactStories from 'react-insta-stories'

interface Props {
	className?: string
}

export const Stories: React.FC<Props> = ({ className }) => {
	const [stories, setStories] = React.useState<IStory[]>([])
	const [selectedStory, setSelectedStory] = React.useState<IStory>()
	const [open, setOpen] = React.useState(false)

	React.useEffect(() => {
		async function fetchStories() {
			const data = await Api.stories.getAll()
			setStories(data)
		}
		if (open) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = 'unset'
		}
		fetchStories()
	}, [open])

	const onClickStory = (story: IStory) => {
		setSelectedStory(story)
		if (story.items.length > 0) {
			setOpen(true)
		}
	}

	return (
		<>
			<Container
				className={cn(
					className,
					'flex items-center flex-nowrap md:flex-wrap sm:flex-wrap max-sm:flex-wrap justify-between gap-5 lg:gap-4 md:gap-1  max-sm:gap-[2px] my-10 max-sm:my-5'
				)}
			>
				{stories.length == 0 &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className='w-48 h-60 lg:w-44 lg:h-56 md:w-32 md:h-40 sm:w-32 sm:h-40 max-sm:w-28 max-sm:h-32 animate-pulse bg-gray-200 rounded-md'
						></div>
					))}
				{stories.map((story, index) => (
					<img
						key={index}
						onClick={() => onClickStory(story)}
						className='rounded-md cursor-pointer w-48 lg:w-44 md:w-32 sm:w-32 max-sm:w-28'
						src={story.previewImageUrl}
					></img>
				))}
				{open && (
					<div className='absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'>
						<div className='relative '>
							<button
								className='absolute -right-10 -top-5 z-30'
								onClick={() => setOpen(false)}
							>
								<X className='absolute top-0 right-0 w-8 h-8 text-white/50' />
							</button>

							<ReactStories
								onAllStoriesEnd={() => setOpen(false)}
								stories={
									selectedStory?.items.map(item => ({ url: item.sourceUrl })) ||
									[]
								}
								defaultInterval={3000}
								width={'500px'}
								height={'700px'}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	)
}
