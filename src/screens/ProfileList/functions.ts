import PropTypes from 'prop-types'
import {redux, navigator} from 'services'
import {INFO_USER, CHANGE_PROFILE, MY_LIST, CONTINUE_WATCHING} from '~/endpoints'

var isMounted_profile_list, state_profile_list, response, fn

/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
export const load = {
	status: () => state_profile_list,
	start: () => state_profile_list = true,
	end: () => state_profile_list = false,
	isMounted: () => isMounted_profile_list,
	onMounted: state => {
		fn = state??{}
		isMounted_profile_list = true
    	return isMounted_profile_list
	},
	onUnMounted: () => {
		isMounted_profile_list = false
    	return isMounted_profile_list
	},
}

async function onInfoUser(data: object)
{
	let s = {...fn.state}

	if(load.status()) return
	load.start()

	response = data??await INFO_USER()
   if(response && load.isMounted()) fn.setState({...s, ...response})
   load.end()
}


async function onBlocksProfile()
{
	response = await MY_LIST()
	if(response) redux.push('mi_lista_mix', response)

	response = await CONTINUE_WATCHING()
	if(response) redux.push('estas_viendo', response)
}

async function onSelect<Type>(selected, profile_id)
{
	let s = {...fn.state}

	if(load.status()) return
	load.start()

    if(profile_id === selected){
    	fn.setState({...s, isselect: true})
    	navigator('goBack') 
    }

    response = await CHANGE_PROFILE(selected)
	
	if(response && load.isMounted()) {
		fn.setState({...s, isselect: true})
		navigator('goBack')
	}
	load.end()
}

function onBack(use = false)
{
	const {username} = redux.get('info_user')

	if(!username) return navigator('goBack')

	let s = {...fn.state}

	onBlocksProfile()

	//if(s.ismenu && !s.isselect) navigator(`toggleDrawer`)
}

function onEditView<Type>(edit: bool)
{
	let s = {...fn.state}
	fn.setState({...s, edit})
}

function onEdit<Type>(profile: object)
{
	navigator('ProfileEdit',profile)
}

export default {
	onBack,
	onEdit,
	onSelect,
	onEditView,
	onInfoUser,
	onBlocksProfile,
}
