import {Keyboard} from 'react-native'
import {navigator} from 'services'
import {AVATAR, CLASS, PROFILE, INFO_USER} from '~/endpoints'

import config, {configNavigatation} from 'config'

const {colors} = config()


var isMounted_profile_list, state_profile_edit, response, fn

/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
export const load = {
	status: () => state_profile_edit,
	start: () => state_profile_edit = true,
	end: () => state_profile_edit = false,
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

async function onLoad()
{
	if(load.status()) return
	load.start()

	response = await CLASS()
   if(response && load.isMounted()) fn.setClasss(response)

	response = await AVATAR()
   if(response && load.isMounted()) fn.setAvatars(response)

   load.end()
}

async function onSave()
{
	let s = {...fn.state}

	if(s.is_add) return
	if(load.status()) return
	load.start()
	
	onCloseKeyboard(s)

	fn.setLoading(true)

	let body = {
		name: s.name, 
		class_id: s.valueClass_, 
		gender: s.valueGender, 
		avatar_id: s.valueAvatarId, 
	}

	if(s.id){
		body.id = s.id
	}

	response = await PROFILE(body)

	await INFO_USER()

	if(load.isMounted()) fn.setLoading(false)
	if(load.isMounted()) fn.setOld(s)
	
   //if(load.isMounted()) navigator('goBack')
   load.end()
}

function useLayoutEffect()
{
	const {headerStyleInterpolator} = configNavigatation

	if(typeof fn.navigation.setOptions !== 'function') return

    fn.navigation.setOptions({
		headerStyleInterpolator, 
		headerStyle: {
		  	backgroundColor: colors.background,
		},
		presentation:'transparentModal',
		headerMode: 'float',
		title: null,
		headerShown: false,
    })
}

function onState<Type>(type: string, value: string)
{
	let s = {...fn.state}
	if(type === 'gender_open'){
		fn.setState({...s, openAvatars: false, openGender: value, openClass_: false})
	}
	else if(type === 'gender_item'){
		fn.setState({...s, openAvatars: false, openGender: false, openClass_: false, valueGender: value.value})
	}
	else if(type === 'class_open'){
		fn.setState({...s, openAvatars: false, openGender: false, openClass_: value})
	}
	else if(type === 'class_item'){
		fn.setState({...s, openAvatars: false, openGender: false, openClass_: false, valueClass_: value.value})
	}
	else if(type === 'avatars_open'){
		fn.setState({...s, openAvatars: value})
	}
	else if(type === 'avatars_item'){
		fn.setState({...s, openAvatars: false, valueAvatarId: `${value.id}` ,image: value.image})
	}
	else if(type === 'name'){
		fn.setState({...s, openAvatars: false, name: value})
	}
}

function onCloseKeyboard()
{
	let s = {...fn.state}

   Keyboard.dismiss()
   fn.setState({...s, openAvatars: false, openGender: false, openClass_: false})
}

export default {
	onLoad,
	onSave,
	onState,
	onCloseKeyboard,
	useLayoutEffect,
}