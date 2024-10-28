import { ChooseProductModal, Container } from '@/shared/components/shared'
import { prisma } from '@/prisma/prisma-client'
import { notFound } from 'next/navigation'

export default async function ProductPageModal({
	params: { id },
}: {
	params: { id: string }
}) {
	const product = await prisma.product.findFirst({
		where: { id: Number(id) },
		include: {
			ingredients: true,
			variations: true,
		},
	})

	if (!product) {
		return notFound()
	}
	return (
		<Container>
			<ChooseProductModal product={product} />
		</Container>
	)
}
