import {api, toast, onContents} from 'lib'
import mapperCriteria from '~/mappers/criteria'

// Tambien es usado para NOVEDADES
export default async (criteria, params) =>
{
	var {page, count, slug, name, as} = params??{}

	page = page??1

	const loading = (page === 1 && name !== undefined)	

	if(!criteria) return

	let object = {
		page,
		count: count || 30,
	}

	if(slug) object.string = slug
	if(as) object.as = as

	let response = await api.get(loading, `/content/search/${criteria}`, object)
	
	if(!response) return name
		? toast(`"${name}" no dosponible en este momento`)
		: undefined
	
	response = onContents(mapperCriteria(criteria, response))
	
	if(as === 'stars') response.title = `Peliculas con ${name}`
	else if(criteria === 'novedades'){
		
		response.novedades = true

		if(page === 1){
			console.log(response)
		}
	}
	return response
}