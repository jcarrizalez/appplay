import {api, redux, storage} from '~/services'
import mapperInfoUser from '~/mappers/info_user'

const URL = '/profiles/change'

export default async id =>
{
	const loading = true
	
	let response = await api.post(loading, '/profiles/change', {profileId:id})

	let {autologin} = response??{}

	if(!autologin) return

	let status = redux.get('info_user')
	
	status.profile_id = id
	status.profile_name = response.profile_name

	let image = response.image.medium??''

	status.image = (image.indexOf('http') === -1)? `https:${image}` : image
		
	redux.push('info_user', status)
	
	await storage.push('autologin', autologin)

	return true
}