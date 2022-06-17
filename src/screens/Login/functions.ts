import {Keyboard} from 'react-native'
import {navigator, toast} from 'services'
import {LOGIN} from '~/endpoints'

var isMounted_login, state_login, response, fn

/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
export const load = {
	status: () => state_login,
	start: () => state_login = true,
	end: () => state_login = false,
	isMounted: () => isMounted_login,
	onMounted: state => {
		fn = state??{}
		isMounted_login = true
    	return isMounted_login
	},
	onUnMounted: () => {
		isMounted_login = false
    	return isMounted_login
	},
}

async function onLogin(data)
{
	let s = {...fn.state}

    s.errorUsername = (s.username.indexOf('@')=== -1 || s.username.length<=5)
    
    s.errorPassword = (s.password.length<=3)

    if(s.errorPassword || s.errorUsername) return fn.setState(s)

    if(load.status()) return
	
	load.start()

    let response = await LOGIN(s.username, s.password)

    load.end()
    
    if(!load.isMounted()) return

    if(!response){
    	s.errorUsername = true
		s.errorPassword = true
		s.errorAll = true
    	return fn.setState(s)
    }
    
    return ((response.profiles?.length??null) === 1)
      	? navigator(`goBack`)
		: fn.navigation?.replace(`ProfileList`, response)
}

function useLayoutEffect()
{
	if(typeof fn.navigation.setOptions !== 'function') return

    fn.navigation.setOptions({
		presentation:'transparentModal',
		headerShown: false,
    })
}

function onState<Type>(type: string, value: string)
{
	let s = {...fn.state}

	if(type === `visibility`){

		if(s.develop) return toast(`No habilitado para mostrar en desarrollo`)
	}
	else{
		s = {...s, errorUsername: false, errorPassword: false, errorAll: false}
	}

    fn.setState({...s, [type]: value})
}

function onCloseKeyboard()
{
   Keyboard.dismiss()
}

export default {
	onLogin,
	onState,
	onCloseKeyboard,
	useLayoutEffect,
}