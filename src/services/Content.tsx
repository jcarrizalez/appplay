import Service from './Service'
import {CONTENT_SEARCH, CONTENT_DETAIL, CONTENT_PLAY, CONTENT_RELATED} from 'endpoints'
import {contents, onUnique} from 'lib'

export default class Content extends Service
{
  protected contents = contents

  protected onUnique = onUnique

  async play({uuid, title, isCast, useNavigator = true})
  {
    if(!this.isMounted() || this.isRunning('play')) return

    this.setRunning('play')

    let response = await CONTENT_PLAY(uuid, title, isCast)

    this.setRunning('play')

    if(!this.isMounted() || !response) return

    if(isCast) this.redux.push('google_cast', response)
    else if(useNavigator) this.navigator('Player', response)
    else return response
  }

  async detail(uuid, title, useNavigator = true)
  {
    if(!this.isMounted() || this.isRunning('detail')) return
    
    this.setRunning('detail')

    let response = await CONTENT_DETAIL(uuid, title)

    this.setRunning('detail')
    
    if(!this.isMounted() || !response) return

    if(useNavigator) this.navigator('ContentDetail', response)
    else return response
  }

  async search(type_, params, useNavigator = true)
  {
    if(!this.isMounted() || this.isRunning('search')) return

    this.setRunning('search')
    
    switch(type_){
      case 'stars':
      case 'directors':
        params = {...params, as: type_}
        type_ = 'person'
      break
    }

    let response = await CONTENT_SEARCH(type_, params)

    this.setRunning('search')

    if(!this.isMounted() || !response) return

    if(useNavigator) this.navigator('ContentSearch', response)
    else return response
  }
  
  async related(uuid)
  {
    if(!this.isMounted() || this.isRunning('related')) return
    
    this.setRunning('related')

    let response = await CONTENT_RELATED(uuid, {})

    this.setRunning('related')

    if(!this.isMounted() || !response) return

    return response
  }

  info(uuid)
  {
    if(!this.isMounted() || this.isRunning('info')) return

    this.setTime(100)

    this.setRunning('info')

    this.navigator('ContentInfo', uuid)

    this.setRunning('info')
  }

  infoByBanner(uuid)
  {
    try {
      let response = this.contents.get([uuid]).map(content => ({
        anio: content.anio,
        description: content.description,
        duration: content.duration,
        fanarts: content.fanarts,
        landscape: content.landscape,
        portrait: content.portrait,
        rating: content.rating,
        title: content.title,
        uuid: content.uuid,
        watchlater: content.watchlater,
      })).filter(item => item != null)

      return response[0]

    } catch (error) {
      return logger.error('uuid no exists in redux')
    }
  }

  getByArrayInRedux(uudis)
  {

  }
}
