import Service from './Service'
import {LOGIN,INFO_USER, CHANGE_PROFILE, PROFILE, MY_LIST, CONTINUE_WATCHING, CLASS, AVATAR} from '~/endpoints'

export default class User extends Service
{
  async login(username, password)
  {
    if(this.isRunning('login')) return

    this.setRunning('login')

    let response = await LOGIN(username, password)

    this.setRunning('login')

    return response ?? null
  }

  /**
   * Is Post by uuid!==null, Is Get uuid===null 
   */
  async watchlater(uuid = null, watchlater = null)
  {
    if(this.isRunning('watchlater')) return

    this.setRunning('watchlater')

    let response = await MY_LIST({uuid, watchlater})

    this.setRunning('watchlater')

    return response ?? null
  }

  async continueWatching(uuid = null, watchlater = null)
  {
    if(this.isRunning('continueWatching')) return

    this.setRunning('continueWatching')

    let response = await CONTINUE_WATCHING()

    this.setRunning('continueWatching')

    return response ?? null
  }

  async changeProfile(id)
  {
    if(this.isRunning('changeProfile')) return

    this.setRunning('changeProfile')

    let response = await CHANGE_PROFILE(id)

    this.setRunning('changeProfile')

    return response ?? null
  }

  async profile(body = {})
  {
    if(this.isRunning('profile')) return

    this.setRunning('profile')

    let response = await PROFILE(body)

    this.setRunning('profile')

    return response ?? null
  }

  async info()
  {
    if(this.isRunning('info')) return

    this.setRunning('info')

    let response = await INFO_USER()

    this.setRunning('info')

    return response ?? null
  }

  async refreshBlocksProfile()
  {
    if(this.isRunning('refreshBlocksProfile')) return

    this.setRunning('refreshBlocksProfile')
    
    let response = await this.continueWatching()
    if(response) this.redux.push('estas_viendo', response)
    else this.redux.push('estas_viendo', {...this.redux.get('estas_viendo'),elements:[]})

    response = await this.watchlater()
    if(response) this.redux.push('mi_lista_mix', response)
    else this.redux.push('mi_lista_mix', {...this.redux.get('mi_lista_mix'),elements:[]})

    this.setRunning('refreshBlocksProfile')
  }


  async class()
  {
    if(this.isRunning('class')) return

    this.setRunning('class')

    let response = await CLASS()

    this.setRunning('class')

    return response ?? null
  }

  async avatar()
  {
    if(this.isRunning('avatar')) return

    this.setRunning('avatar')

    let response = await AVATAR()

    this.setRunning('avatar')

    return response ?? null
  }
}
