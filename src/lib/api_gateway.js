import redux from './redux'
import axios from 'axios';
import config from 'config'

const {company} = config()

const headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
	'Accept-Encoding': 'gzip, deflate, br'
}
var payload, response

function params(type, url, query_params)
{
	if(typeof query_params === 'object' && query_params !== null){

		url += (url.indexOf('?') === -1 )?'?':''
		
		url += new URLSearchParams(query_params).toString()
	}

	let server = company.server[company.server.current]

	console.log(`${type}: ${server}${url}`)

	return server + url
}

const onLoading = value => redux.push('loading', value)

async function axios_(type, loading, url, query_params, options, body)
{
	url = params(type, url, query_params)

	response = undefined

	if(loading) onLoading(true)
	
	try {

		if(type === `get`){
			payload = await axios.get(url, options).catch(err => err)
		}
		else if(type === `post`){
			payload = await axios.post(url, body, options).catch(err => err)
		}
		else if(type === `put`){
			payload = await axios.put(url, body, options).catch(err => err)
		}
		else{
			throw ''
		}

		if(payload instanceof Error){
			//console.log(payload.response.status)
			console.log(`error: ${payload.response.status} ${type}: ${payload.config.url}`)
			console.log(payload.message)
		}
		else{
			response = payload.data?.data??response
		}

	} catch (error) {
		console.log('Error: services/api_gateway post:', url)
		//console.warn(error)
	}

	if(loading) onLoading(false)

	return response
}

export default {
	get: async (loading, url, query_params = null, options = {}) => await axios_(`get`, loading, url, query_params, options),
	put: async (loading, url, body = {}, query_params = null, options = {}) => await axios_(`put`, loading, url, query_params, options, body),
	post: async (loading, url, body = {}, query_params = null, options = {}) => await axios_(`post`, loading, url, query_params, options, body),
}