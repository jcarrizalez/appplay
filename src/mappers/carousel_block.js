import {logger} from 'lib'
import mapperContent from '~/mappers/content'

export default block =>
{
	try {
		var {id, logged, data, metadata:{slug, title} } = block

		var {elements, metadata} = block.data??{}
		
		elements = elements??[]
		metadata = metadata??{}

		elements = elements.map( content => mapperContent('short', content))

		return {
			type:'carousel',
			id,
			slug,
			title,
			elements,
			metadata
		}
	} catch (error) {
		return logger.error('mappers/carousel_block')
	}
}