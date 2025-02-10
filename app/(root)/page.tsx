import {
	Container,
	Filters,
	ProductGroupList,
	Stories,
	Title,
	TopBar,
} from '@/shared/components/shared'
import { Suspense } from 'react'
import { findWoks, GetSearchParams } from '@/shared/lib/find-woks'

export default async function Home({
	searchParams,
}: {
	searchParams: GetSearchParams
}) {
	const categories = await findWoks(searchParams)
	const isEmpty =
		categories.filter(item => item.products.length > 0).length == 0
	return (
		<>
			<Container className='mt-5 '>
				<Title
					text='Все товары '
					className='font-extrabold  max-[400px]:text-3xl'
					size='lg'
				/>

				<Stories />
				<TopBar
					categories={categories.filter(
						category => category.products.length > 0
					)}
				/>
			</Container>

			<Container className='mt-10 '>
				<div className='flex gap-[60px]'>
					<div className='w-[250px] md:inline-block sm:hidden max-sm:hidden '>
						<Suspense>
							<Filters />
						</Suspense>
					</div>
					{isEmpty ? (
						<div className='text-xl  flex justify-center items-center w-full '>
							<p>К сожалению товаров с таким фильтром нет 😓</p>
						</div>
					) : (
						<div className='flex-1'>
							<div className='flex flex-col gap-11'>
								{categories.map(
									category =>
										category.products.length > 0 && (
											<ProductGroupList
												key={category.id}
												title={category.name}
												items={category.products}
												categoryId={category.id}
											/>
										)
								)}
							</div>
						</div>
					)}
				</div>
			</Container>
		</>
	)
}
