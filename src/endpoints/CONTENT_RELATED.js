import {api, onContents} from 'services'
import mapperCriteria from '~/mappers/criteria'

export default async (uuid, params = {}) =>
{
	const loading = false
	
	let response = await api.get(loading, `/content/${uuid}/related`, {
		page:1, 
		count:30,
	})

	if(!response) return

	return onContents(mapperCriteria(`related`, {data: response, title:'', slug: null}))
}
