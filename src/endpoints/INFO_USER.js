import {api, toast, redux} from 'lib'
import mapperInfoUser from '~/mappers/info_user'

export default async () =>
{
	const loading = false
	
	let response = await api.get(loading, '/user/info')

	var {status} = response??{}

	if(!status) return toast('Error: ocurrio un error')

	redux.push('info_user', mapperInfoUser(response))

	return mapperInfoUser(response, true) // true para traer el token de los profiles
}
