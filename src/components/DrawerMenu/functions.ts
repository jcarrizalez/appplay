import {navigator} from 'lib'
import {CONTENT_SEARCH, MY_LIST, CONTINUE_WATCHING, LOGOUT} from '~/endpoints'

import config from 'config'

const {company} = config()

var state_load, response

/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
const load = {
	status: () => state_load,
	start: () => state_load = true,
	end: () => state_load = false
}

async function onContentSearchGenres<Type>({slug, name})
{
	if(load.status()) return
	load.start()

  response = await CONTENT_SEARCH('genres', {slug, name} )

  if(response) navigator('ContentSearch',{...response, ismenu:true})
 	load.end()
}

async function onMyList<Type>()
{
	if(load.status()) return
	load.start()

  response =  await MY_LIST({ismenu:true})

	if(response) navigator('ContentSearch',{...response, ismenu:true})
	load.end()
}
  
async function onContinueWatching<Type>()
{
	if(load.status()) return
	load.start()

  response =  await CONTINUE_WATCHING({ismenu:true})

	if(response) navigator('ContentSearch',{...response, ismenu:true})
	load.end()
}

async function onNovedades<Type>()
{
	if(load.status()) return
	load.start()

  response =  await CONTENT_SEARCH('novedades', {name:`Novedades`, ismenu:true})

	if(response) navigator('ContentSearch',{...response, ismenu:true})
	load.end()
}

async function onLogout<Type>()
{
	if(load.status()) return
	load.start()

  await LOGOUT()
  load.end()
}

async function onShare<Type>(Share)
{
	if(load.status()) return
	load.start()

	try {
      	const result = await Share.share({message:`${company.name} | compartido desde la app`})

		if (result.action === Share.sharedAction)
		{
			if (result.activityType) {
			  // shared with activity type of result.activityType
			}
			else {
			  // shared
			}
		}
		else if (result.action === Share.dismissedAction) {
		// dismissed
		}
    } catch (error) {
      alert(error.message);
    }
    load.end()
}

function onLogin<Type>()
{
	if(load.status()) return
	load.start()

    navigator('Login',{ismenu:true})
    load.end()
}

function onProfiles<Type>({profile_id, profiles}, isedit = false)
{
	if(profile_id===undefined) return onLogin()

	if(load.status()) return
	load.start()

	navigator('ProfileList',{profile_id, profiles, isedit, ismenu:true})
	load.end()
}

async function onTheme<Type>()
{
	if(load.status()) return
	load.start()

	navigator('Theme',{})
	load.end()
}


export default {
	onShare,
	onLogin,
	onLogout,
	onTheme,
	onMyList,
	onProfiles,
	onNovedades,
	onContinueWatching,
	onContentSearchGenres,
}
