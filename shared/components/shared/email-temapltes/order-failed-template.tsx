import React from 'react'

interface Props {
	orderId: number
}

export const OrderFailedTemplate: React.FC<Props> = ({ orderId }) => {
	return (
		<div>
			<h1>К сожалению, возникла ошибка при оплате заказа ❌</h1>
			<p>Ваш заказ #{orderId} отменен</p>
		</div>
	)
}
