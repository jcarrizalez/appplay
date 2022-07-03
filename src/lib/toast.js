import redux from './redux'

function toast(message, params)
{
	let {update, id} = params??{}

	redux.push('toast', {message, update, id})

	if(update) return redux.get('toast').message
}

export default toast