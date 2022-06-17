import {api, toast, redux} from 'services'
import mapperInfoUser from '~/mappers/info_user'

export default async (params = {}) => 
{
	let action = params.id? `put` : `post`

	const url = params.id? `/${params.id}` : ``

	const loading = false
	
	let response = await api[action](loading, `/user/profiles${url}`, params)

	if(!response) return toast('Error: ocurrio un error')

	return response
}