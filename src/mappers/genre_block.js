import {logger} from 'lib'
import mapperContent from '~/mappers/content'

export default (block) =>
{
	//console.log(block)
	return 
	try {
		var {id, logged, data:{elements, metadata},metadata:{slug, title} } = block

		elements = elements.map( content => mapperContent('short', content))

		return {
			type:'genre',
			id,
			slug,
			title,
			elements,
			metadata
		}
	} catch (error) {
		return logger.error('mappers/genre_block')
	}
}