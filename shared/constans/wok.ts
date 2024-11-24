export const mapWokSize = {
	S: 'Маленькая',
	M: 'Средняя',
} as const

export const mapWokType = {
	1: 'Классическая',
	2: 'Острая',
} as const

export const wokSizes = Object.entries(mapWokSize).map(([value, name]) => ({
	name,
	value,
}))

export const WokTypes = Object.entries(mapWokType).map(([value, name]) => ({
	name,
	value,
}))

export type WokSize = keyof typeof mapWokSize
export type WokType = keyof typeof mapWokType
