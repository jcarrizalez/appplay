import {api, redux, toast, contents, onContents} from 'lib'
import mapperContent from '~/mappers/content'
import mapperCarouselBlock from '~/mappers/carousel_block'

export default async params =>
{
	
	const uuid = params?.uuid
	
	if(uuid) return postUuid(uuid, params)
	
	const page = params?.page??1
	const ismenu = params?.ismenu??false

	const loading = (ismenu === true && page === 1)

	let response = await api.get(loading, `/user/my-list`, {
		page,
		count: params?.count??30
	})

	const force = true

	//parche hasta revisar en la api que pasa
	let data = []
	response.data.elements.forEach(item => {
		//item.status.watchlater = true
		data.push(item)
	})
	response.data.elements = data

	response = onContents(mapperCarouselBlock(response), force)

	if(!response) return ismenu? toast(`ocurrio en error`) : undefined

	var {elements, metadata, slug, title} = response??{}

	if(elements.length === 0) return ismenu? toast(`Mi Lista: se encuentra vacia`) : undefined

	if(!ismenu) return response

	//elements = elements.map( content => mapperContent('short', content))

	return {
		title,
		my_list: true,
		total: metadata.total,
		elements,
		metadata,
	}
}

async function postUuid(uuid, params)
{
	const loading = false

	let message = params?.watchlater? 'agregando a' : 'eliminando de'

	let id_toast = toast(`${message} mi lista...`, {update:true})

	let response = await api.post(loading, `/user/favorite`, {
		uuid
	})

	if(!response) return toast('ocurrio un error', {id:id_toast})

	let content = contents.find(uuid)

	let { watchlater } = response

	if(content){

		contents.remove(uuid)

		contents.push([{
			...content,
			watchlater
		}])

		redux.push('watchlater', {uuid, watchlater})

		message = watchlater? 'agregado' : 'eliminado'

	    toast(`Mi Lista: ${message}`, {id:id_toast})
	}
	return response
}

