import {logger} from 'lib'

export default (response, use_token = false) => {
	try {
		var {profiles, status} = response
		
		profiles = profiles.map( item => {

			let image = item.image.medium??''
			let avatar_id = item.image.id??''

			image = (image.indexOf('http') === -1)? `https:${image}` : image
			
			return {
				id:item.id,
				name:item.profile_name,
				image,
				auth_token: use_token? item.auth_token : null,
				avatar_id,
				gender:item.gender,
				class_id:item.class.id,
				class_description:item.class.description,
			}
		})

		let profile = profiles.find(item => item.id === status.activeProfileId)

		let first_name = status.firstName??''
		let last_name = status.lastName??''
		let name = `${first_name} ${last_name}`

		return {
			username:status.username, 
			name:(name.trim()==='')?username:name,
			first_name, 
			last_name, 
			image:profile.image??'', 
			profile_id:status.activeProfileId,
			profile_name: profile.name,
			active_subscription:status.activeSubscription,
			profiles
		}
	} catch (error) {
		return logger.error('mappers/info_user')
	}
}