import {redux, navigator} from 'lib'
import {MY_LIST, CONTENT_PLAY} from '~/endpoints'

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

async function onWatchlater(uuid: string, watchlater: bool, setCheck: func, setLoadingCheck: func)
{
	if(load.status()) return
	load.start()
	
	setLoadingCheck(true)

	response = await MY_LIST({uuid, watchlater})

	setLoadingCheck(false)

	if(response) setCheck(response.watchlater)
	load.end()
}

async function onPlay(iscast: string, uuid: string, title: string, onClose: func)
{
	if(load.status()) return
	load.start()
	
	onClose()

	response = await CONTENT_PLAY(uuid, title, iscast)

	if(response){
      redux.push('google_cast', response)
    }
    else{
      navigator('Player', response)
    }

	load.end()
}



function onContentDetail(data: object, onClose: func)
{
	if(load.status()) return
	load.start()

    onClose()

    navigator('ContentDetail', data)
    load.end()
}

export default {
	onPlay,
	onWatchlater,
	onContentDetail,
}