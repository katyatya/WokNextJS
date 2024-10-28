import {
	Container,
	WokImage,
	SelectGroup,
	Title,
} from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPage({
	params: { id },
}: {
	params: { id: string }
}) {
	const product = await prisma.product.findFirst({ where: { id: Number(id) } })
	if (!product) {
		return notFound()
	}
	return (
		<Container className='flex flex-col my-10'>
			<div className='flex flex-1'>
				<WokImage imageUrl={product?.imageUrl} size='S' />
				<div className='w-[490px] bg-gray-50 p-5'>
					<Title text={product.name} />
					<p>
						Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deleniti,
						soluta. Nesciunt cumque tempora vel fugit dicta magni a nisi animi
						dolor quidem fugiat nobis nostrum, saepe perspiciatis illo minus
						ducimus!
					</p>
					<SelectGroup
						items={[
							{
								name: 'S',
								value: '1',
							},
							{
								name: 'M',
								value: '2',
								disabled: true,
							},
						]}
						selectedValue='1'
					/>
				</div>
			</div>
		</Container>
	)
}
