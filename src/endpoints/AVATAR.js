import {api} from 'lib'

export default async (params) =>
{
	const loading = false

	let response = await api.get(loading, `/utils/profiles/avatar`, {
		page: params?.page || 1, 
		count: params?.count || 30,
	})

	if(response) return response.map(item =>({
		id: item.id,
		image: item.medium
	}))
}