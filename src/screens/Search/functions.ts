import {redux, navigator} from 'lib'
import {SEARCH, CONTENT_SEARCH} from '~/endpoints'

import {configNavigatation} from 'config'


var isMounted_search_list, state_search_edit, response, fn

/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
export const load = {
	status: () => state_search_edit,
	start: () => state_search_edit = true,
	end: () => state_search_edit = false,
	isMounted: () => isMounted_search_list,
	onMounted: state => {
		fn = state??{}
		isMounted_search_list = true
    return isMounted_search_list
	},
	onUnMounted: () => {
		isMounted_search_list = false
    return isMounted_search_list
	},
}

async function onNovedades()
{
	let novedades = redux.get('novedades')?.elements

	if(novedades) return fn.setNovedades(novedades)

	if(load.status()) return
	load.start()

	response = await CONTENT_SEARCH('novedades',{count:60})

 	load.end()
  if(!load.isMounted() || !response) return 
  fn.setNovedades(response?.elements??[])
	redux.push('novedades', response)
}

async function onContentSearch<Type>(type, {slug, name})
{
	if(load.status()) return
	load.start()

	response = await CONTENT_SEARCH('person', {slug, name, as: type} )

  if(load.isMounted() && response) navigator('ContentSearch',response)
 	load.end()
}

function useLayoutEffect()
{
	const {modalIos} = configNavigatation

	let s = {...fn.state}

	if(typeof fn.navigation.setOptions !== 'function') return

  fn.navigation.setOptions({
    presentation: s.ishome ?'modal' : 'transparentModal',
    headerShown: false,
    ...modalIos,
  })
}

function onContentInfo<Type>(props)
{	
	if(load.status()) return
	load.start()
		
	let s = {...fn.state}

	let item = props?.uuid? props : props?.item

	let uuid = item?.uuid

	if(s.ishome) navigator('ContentInfo', uuid)
	else navigator('ContentDetail', item)
	
	//Esto debo reparlo desde los block y grid en todo los sitios donde se use
	load.end()
}

function onPlay<Type>({item})
{
	if(load.status()) return
	load.start()

  navigator('ContentDetail', {...item, is_player: true})
  load.end()
}

async function onSearch<Type>(text, state, setLoad)
{	
	if(load.status()) return

	load.start()
  setLoad(false)

  redux.push('search', text === ''
    ? {
	    	text,
	    	...state
    	}
    : {
	      text,
	      //tags: await SEARCH('tags', text),
	      cast: await SEARCH('cast', text),
	      director: await SEARCH('director', text),
	      content: await SEARCH('content', text),
    }
  )

  load.end()
  if(load.isMounted()) setLoad(true)
}

export default {
	onPlay,
	onSearch,
	onNovedades,
	onContentInfo,
	onContentSearch,
	useLayoutEffect,
}