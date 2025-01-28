import axios from 'axios'

export const getMe = async () => {
	const data = (await axios.get('api/auth/me')).data
	return data
}
