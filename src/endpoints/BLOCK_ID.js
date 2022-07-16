import {api, toast, contents, onContents} from 'lib'
import mapperCarouselBlock from '~/mappers/carousel_block'

export default async (id, params) =>
{
	const loading = false

	if(!id) return

	let response = await api.get(loading, `/marketing/block/${id}`, {
		page: params.page || 1, 
		count: params.count || 30,
	})

	if(!response) return toast(`ocurrio un error blockid:${id}`)

	if(!response.data) return

	return onContents(mapperCarouselBlock(response))
}
