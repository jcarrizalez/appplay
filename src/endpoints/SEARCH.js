import {api, redux, onContents} from '~/services'
import mapperCriteria from '~/mappers/criteria'
import mapperPerson from '~/mappers/person'

export default async (type, string) =>
{
	if(!string || !type) return
	
	const loading = false

	//string = 'sexo'
	let object = {
		string,
		page:1, 
		count:30,
	}


	switch(type){
		case 'content':
			response = await api.get(loading, `/content/search/search_mix`, object)
			break
		case 'tags':
			response = await api.get(loading, `/tags/search`, object)
			break
		case 'cast':
		case 'director':
			response = await api.get(loading, `/person/search`, {...object, role: type})
			break
		default:
			return
	}

	switch(type){
		case 'content':
			if(!response) return []
			response = onContents(mapperCriteria(string, response))
			return response.elements
		case 'tags':
			if(!response) return
			if(response?.elements.length === 0) return
			return
		case 'cast':
		case 'director':
			if(!response) return
			if(response?.elements.length === 0) return
			return mapperPerson(response.elements)
		default:
			return
	}
}