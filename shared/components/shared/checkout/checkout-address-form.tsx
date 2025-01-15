import { Controller, useFormContext } from 'react-hook-form'
import { AdressInput, ErrorText, FormTextarea, WhiteBlock } from '..'

interface Props {
	className?: string
}
export const CheckoutAddressForm: React.FC<Props> = ({ className }) => {
	const { control } = useFormContext()
	return (
		<WhiteBlock title='3. Адресс доставки ' className={className}>
			<div className='flex flex-col gap-5'>
				<Controller
					control={control}
					name='address'
					render={({ field, fieldState }) => (
						<>
							<AdressInput onChange={field.onChange} />
							{fieldState.error?.message && (
								<ErrorText text={fieldState.error.message} />
							)}
						</>
					)}
				/>

				<FormTextarea
					className='text-base'
					placeholder='Комментарий к заказу'
					rows={5}
					name='comment'
				/>
			</div>
		</WhiteBlock>
	)
}
