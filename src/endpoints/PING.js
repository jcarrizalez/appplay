import {api} from '~/services'

export default async () =>
{
	const loading = false
	
	let response = await api.get(loading, '/ping')

	var {token} = response??{}

	if(!token) return

	return response
}
