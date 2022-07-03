import {api} from 'lib'

export default async () =>
{
	const loading = false
	
	let object = {
		page:1, 
		count:30,
	}

	let response = await api.get(loading, '/genres', object)

	if(!response) return

	var {elements, metadata} = response??{}

	elements = elements.map(item => {
		return {
			name: item.name,
			slug: item.slug,
		}
	})
	return {
		metadata,
		elements
	}
}