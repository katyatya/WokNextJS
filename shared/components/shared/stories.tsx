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
					'flex items-center justify-between gap-5 my-10'
				)}
			>
				{stories.length == 0 &&
					[...Array(6)].map((_, index) => (
						<div
							key={index}
							className='w-52 h-60 animate-pulse bg-gray-200 rounded-md'
						></div>
					))}
				{stories.map((story, index) => (
					<img
						key={index}
						onClick={() => onClickStory(story)}
						className='rounded-md cursor-pointer'
						height={250}
						width={200}
						src={story.previewImageUrl}
					></img>
				))}
				{open && (
					<div className='absolute left-0 top-0 w-full h-full bg-black/80 flex items-center justify-center z-30'>
						<div className='relative ' style={{ width: 520 }}>
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
								width={500}
								height={700}
							/>
						</div>
					</div>
				)}
			</Container>
		</>
	)
}
