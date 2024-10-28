import {
	Container,
	Filters,
	ProductGroupList,
	Title,
	TopBar,
} from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredients: true,
					variations: true,
				},
			},
		},
	})

	return (
		<>
			<Container className='mt-5'>
				<Title text='Все товары ' className='font-extrabold' size='lg' />
			</Container>
			<TopBar
				categories={categories.filter(category => category.products.length > 0)}
			/>

			<Container className='mt-10'>
				<div className='flex gap-[60px]'>
					<div className='w-[250px]'>
						<Filters />
					</div>
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
				</div>
			</Container>
		</>
	)
}
