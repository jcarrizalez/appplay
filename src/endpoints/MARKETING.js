import {api, contents, onContents} from 'services'
import mapperCarouselBlock from '~/mappers/carousel_block'
import mapperGenreBlock from '~/mappers/genre_block'
import mapperChannelBlock from '~/mappers/channel_block'

export default async (slug_, params) =>
{
	const loading = false

	if(!slug_) return

	let response = await api.get(loading, `/marketing/block/group/${slug_}`, {
		page: params.page || 1, 
		count: params.count || 70,
		resolve: params.resolve || 20,
	})

	if(!response) return

	var {slug, title, elements, metadata} = response
	
	elements = elements.map( block =>
	{
		switch(block.type){
			case 'CarouselBlock':
				block = onContents(mapperCarouselBlock(block))
				//temporal porque la api no deberia volver datos en estos
				if(block && [`estas_viendo`, `mi_lista_mix`].indexOf(block?.slug) !== -1){
					block.elements = []
				}
				return block
			case 'ChannelBlock':
				return onContents(mapperChannelBlock(block))
			case 'GenreBlock':
				return mapperGenreBlock(block)
			default:
				return
		}
	}).filter(block => block !== undefined)

	return {
		slug, 
		title, 
		elements,
		metadata
	}
}