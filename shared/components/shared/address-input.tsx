'use client'

import React from 'react'
import { AddressSuggestions } from 'react-dadata'
import '/app/globals.css'

interface Props {
	onChange?: (value?: string) => void
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
	return (
		<AddressSuggestions
			token='6417c7f46b24086811637be6ef3ca941561519ed'
			onChange={data => onChange?.(data?.value)}
		/>
	)
}
