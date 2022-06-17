import PropTypes from 'prop-types'
import {redux, toast, nexPage, contents, navigator} from 'services'
import {BLOCK_ID, CONTENT_SEARCH, MY_LIST} from '~/endpoints'

import config, {configNavigatation} from 'config'

const {colors} = config()

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

function navigatorByRedux(navigation)
{
	if(typeof navigation.setOptions !== 'function') return

  try {
  	
  	let { route, params } = redux.get('navigator')
  
    if(route === 'goBack' && navigation?.canGoBack()) return navigation?.goBack()

    else if(route === 'toggleDrawer') return navigation?.toggleDrawer()
    	
    else if(route === 'ContentInfo') return redux.push('content_info', params)

    else if(route === 'GoogleCast') return redux.push('google_cast', params)

    else if([
    	'ContentDetail',
    	'ContentSearch',
    	'Search'
    	].indexOf(route) !== -1)
    {
    	let screen
    	switch(route){
    		case 'ContentDetail':
    			screen = 'screen_content_detail'
    		break
    		case 'ContentSearch':
    			screen = 'screen_content_search'
    		break
    		case 'Search':
    			screen = 'screen_search'
    		break
    	}

    	current = redux.get(screen)
    	current = current === 100 ? 0 : current
    	current = current + 1

    	redux.push(screen, current)

    	navigation?.navigate(`${route}${current}`, params)
    }
    else if(route !== 'goBack') navigation?.navigate(`${route}`, params) 
  } catch (error) {
    console.log('Error: ', route)
  }
}

async function onWatchlater<Type>(uuid, watchlater, setWatchlater)
{
	if(load.status()) return
	load.start()

	response = await MY_LIST({uuid, watchlater})

    if(response) setWatchlater(response.watchlater)
	load.end()
}

async function onContentSearchGenres<Type>({slug, name})
{
	if(load.status()) return
	load.start()

	response = await CONTENT_SEARCH('genres', {slug, name})

	if(response) navigator('ContentSearch', response)
	load.end()
}

async function onBlockId<Type>(load: bool, data: object, setLoad: func, setData: func)
{
	let page = nexPage(data.metadata)

    if(!load || !page) return

    setLoad(false)

    response = await BLOCK_ID(data.id, {page})

    setLoad(true)

    if(response) setData({
      ...data,
      metadata: response.metadata, 
      elements: data.elements.concat(response.elements)
    })
}

function onContentInfo<Type>({is_watching, is_channel, item})
{	
	if(load.status()) return
	load.start()

    if(is_channel) navigator('ChannelDetail', item)
    else if(is_watching) navigator('ContentDetail', item)
    else navigator('ContentInfo', item.uuid)
	load.end()
}

function onPlay<Type>({item})
{
	if(load.status()) return
	load.start()

  navigator('ContentDetail', {...item, is_player: true})
  load.end()
}

function onEventRedux<Type>(type, event, data: object, setData: func)
{
	if(type === `watchlater`){

		let {uuid, watchlater} = event
			let {slug, elements} = data

			return setData({
			  ...data,
			  elements: watchlater
			    ? [uuid].concat(elements)
			    : elements?.filter( item => item !== uuid)
			})
	}
	else if(type === data.slug){

		return setData({...data,...event})
	}
}

export default {
	onPlay,
	onBlockId,
	onWatchlater,
	onContentInfo,
	onEventRedux,
	navigatorByRedux,
	onContentSearchGenres,
}
