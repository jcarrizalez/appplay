import {api, redux, toast, contents, onContents} from 'lib'
import mapperContent from '~/mappers/content'
import mapperCarouselBlock from '~/mappers/carousel_block'

export default async params =>
{
	const page = params?.page??1
	const ismenu = params?.ismenu??false

	const loading = (ismenu === true && page === 1)

	let response = await api.get(loading, `/user/continue-watching`, {
		page,
		count: params?.count??30
	})

	const force = true

	response = onContents(mapperCarouselBlock(response), force)

	if(!response) return ismenu? toast(`ocurrio en error`) : undefined

	var {elements, metadata, slug, title} = response??{}

	if(elements.length === 0) return ismenu? toast(`continuar viendo se encuentra vacio`) : undefined

	if(!ismenu) return response

	//elements = elements.map( content => mapperContent('short', content))

	return {
		title,
		continue_watching: true,
		total: metadata.total,
		elements,
		metadata,
	}
}
