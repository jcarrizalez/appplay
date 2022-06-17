import {api, toast, redux, storage} from 'services'
import mapperInfoUser from '~/mappers/info_user'


export default async (username, password) => 
{
	const loading = true

	let response = await api.post(loading, '/login/password', {
		Username:username, 
		Password:password
	})

	var {autologin} = response??{}

	if(!autologin) return toast('Error: ocurrio un error')
	
	redux.push('info_user', mapperInfoUser(response))

	await storage.push('autologin', autologin)

	await storage.push('history_login', 'true')

	redux.push('history_login', 'true')

	return mapperInfoUser(response, true)
}