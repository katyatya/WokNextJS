import { cn } from '@/shared/lib/utils'
import { RequiredSymbol } from '../required-symbol'
import { Input } from '../../ui'
import { ErrorText } from '../error-text'
import { ClearButton } from '..'
import { useFormContext } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
	className?: string
	name: string
	label?: string
	required?: boolean
}
export const FormInput: React.FC<Props> = ({
	className,
	name,
	label,
	required,
	...props
}) => {
	const {
		register,
		formState: { errors },
		watch,
		setValue,
	} = useFormContext()
	const value = watch(name)
	const errorText = errors[name]?.message as string
	const onClickClear = () => {
		setValue(name, '')
	}
	return (
		<div className={cn(className)}>
			{label && (
				<p className='font-medium mb-2'>
					{label} {required && <RequiredSymbol />}
				</p>
			)}
			<div className='relative'>
				<Input className='h-12 text-md' {...props} {...register(name)} />
				{value && <ClearButton onClick={onClickClear} />}
			</div>
			{errorText && <ErrorText text={errorText} className='mt-2' />}
		</div>
	)
}