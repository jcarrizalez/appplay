import {api, toast, redux, storage} from 'lib'

export default async () =>
{
	const loading = true

	let response = await api.post(loading, '/logout', {})

	if(!response) return toast('Error: ocurrio un error')

	redux.push('info_user', {})

	let {mi_lista_mix, estas_viendo} = redux.all()
	mi_lista_mix.elements = []
	estas_viendo.elements = []

	redux.push('mi_lista_mix', mi_lista_mix)
	redux.push('estas_viendo', estas_viendo)

	await storage.remove('autologin')

	return true
}