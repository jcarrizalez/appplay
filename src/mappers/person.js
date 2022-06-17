import {logger} from 'services' 

export default (data) => {

	try {
		return data.map(({name, slug, images}) => {

			images = images[0]??{}

			return {name, slug, image:images.source??null}
		})
	} catch (error) {
		return logger.error('mappers/person')
	}
}
