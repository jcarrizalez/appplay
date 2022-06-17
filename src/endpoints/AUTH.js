import {api, redux, logger} from 'services'
import config from 'config'

const {company} = config()

const APIKEY = '9088-697E'
const APISECRET='5fd2a7181825445eabd5edfdee1345baab942b2902c42'
const APIVERSION='7.0'
const GEOIP='190.190.18.131'

export default async () => {

	try {
		const loading = false
		
		let options = {
			headers: api.headers,
		}
		let params = undefined

		let body = company.credentials
		
		var response = await api.post(loading, '/auth', body, params, options)

		var {token} = response

		if(!token) throw `token not fount`

		return response

	} catch (error) {
		return logger.error('endpoints/AUTH')
	}
}
