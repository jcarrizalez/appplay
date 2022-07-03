import {api, toast, onContents} from 'lib'
import mapperContent from '~/mappers/content'

export default async (uuid, title) =>
{
	const loading = false

	if(!uuid || !title) return

	let response = await api.get(loading, `/content/${uuid}`)

	if(!response) return toast(`${title} no dosponible`)

	onContents({elements:[mapperContent('short', response)]})

	return mapperContent('full', response)
}
