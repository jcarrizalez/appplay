import redux from 'lib/redux'
import storage from 'lib/storage'
import config from 'config'
const {company} = config()

import PING from '~/endpoints/PING'
import AUTH from '~/endpoints/AUTH'
import GENRES from '~/endpoints/GENRES'
import MY_LIST from '~/endpoints/MY_LIST'
import MARKETING from '~/endpoints/MARKETING'
import AUTO_LOGIN from '~/endpoints/AUTO_LOGIN'
import CONTENT_SEARCH from '~/endpoints/CONTENT_SEARCH'
import CONTINUE_WATCHING from '~/endpoints/CONTINUE_WATCHING'

var response, autologin

async function onLoad<Type>(setLoad: func, setIntro: func)
{
    setLoad(null)
    
    response = await storage.get('intro')
    if(!response) setIntro(true)

    response = await storage.get('theme')
	redux.push('theme', response)
    
    //return  setLoad(true)

    response = await AUTH()
    if(!response) return setLoad(false)

    response = await GENRES()
    if(!response) return setLoad(false)
    redux.push('genres', response.elements)

    autologin = await storage.get('autologin')
    if(autologin){
    	autologin = await AUTO_LOGIN(autologin)
    	if(autologin) await storage.push('autologin', autologin)
    }
    
    response = await storage.get('history_login')
    if(response) redux.push('history_login', response)
    

    response = await MARKETING(company.marketing, {page:1})
    if(!response) return setLoad(false)
    redux.push('marketing', response)

    response = await CONTENT_SEARCH('novedades',{count:60})

    if(response){
        redux.push('novedades', response)
        redux.push('banners_contents', response.elements)
    }

    setLoad(true)
     
	if(autologin){
		response = await MY_LIST()
		if(response) redux.push('mi_lista_mix', response)

		response = await CONTINUE_WATCHING()
		if(response) redux.push('estas_viendo', response)
	}
	response = null
	autologin = null
}

async function onAction<Type>(value, setIntro: func)
{
    await storage.push('intro', 'intro')

    if(value) redux.push('intro', value)
    
    setIntro(false)
}

export default {
	PING,
	onLoad,
	onAction,
}