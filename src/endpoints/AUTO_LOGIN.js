import {api, toast, redux} from 'services'
import mapperInfoUser from '~/mappers/info_user'

export default async hash => 
{
	const loading = false
	
	let response = await api.post(loading, '/login/auto', {
		Hash:hash
	})

	var {autologin} = response??{}

	if(!autologin) return toast('Error: ocurrio un error')

	redux.push('info_user', mapperInfoUser(response))

	return autologin
}