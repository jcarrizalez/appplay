import {logger} from 'services'
import mapperContent from '~/mappers/content'

export default (criteria, response) =>
{
	try {
		var {data:{elements, metadata}, slug, title} = response

		return {
			criteria,
			slug,
			title,
			elements: elements.map( content => mapperContent('short', content)),
			metadata,
		}
	} catch (error) {
		return logger.error('mappers/criteria')
	}
}