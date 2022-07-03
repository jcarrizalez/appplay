export functions from './functions';
export audios from './audios';
export api from './api_gateway'
export storage from './storage'
import redux_ from './redux'
export toast from './toast'

export const redux = redux_

export const nexPage = ({page = 1, count = 0, total = 0, total_pages = 1 }) => {

  if(page<total_pages) return page+1

  return
}

export const navigator = (route, params = {}) => redux.push('navigator', {route, params})

export const contents = {
  push: (elements, force) =>
  {
    let data = redux.get('contents')

    elements.forEach( item =>
    {
      if(data[`uuid${item.uuid}`] === undefined || force) data[`uuid${item.uuid}`] = item
    })
    redux.push('contents', data)
  },
  get: elements =>
  {
    let data = redux.get('contents')

    return elements.map( item =>
    {
      if(data[`uuid${item}`] !== undefined) return data[`uuid${item}`]
      return
    }).filter(item => item !== undefined)
  },
  find: uuid =>
  {
    let data = redux.get('contents')
    
    if(data[`uuid${uuid}`] !== undefined) return data[`uuid${uuid}`]

    return
  },
  uuids: elements =>
  {
    return elements.map( item => item.uuid )
  },
  remove: uuid =>
  {
    let data = redux.get('contents')

    if(data[`uuid${uuid}`] === undefined) return

    delete data[`uuid${uuid}`]

    redux.push('contents', data)
  },
}

export const onUnique = elements => elements?.filter((value, index, self) => self.indexOf(value) === index)

export function onContents(object, force)
{
  try {
    contents.push(object.elements, force)

    object.elements = contents.uuids(object.elements)
    
    return object

  } catch (error) {
    return
  }
}

export const logger = {
  error: (message) =>
  {
    return console.log(`Error: ${message}`)
  }
}

//redux.push('navigator', {route, params})


/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
var state = {}
export const crtl = {

  onMounted: name => {

    let id = name+(new Date).getTime()
    //let id = name

    let time = 0

    state[id] = {
      isMounted: true,
      load: false
    }

    return {
      status: () => {
        if(state[id]) return state[id].load
        return true
      },
      start: () => {
        if(state[id]) state[id].load = true
      },
      end: () => {
        if(state[id]){
          time = setTimeout(() => {
            state[id].load = false
          }, 500)
        } 
      },
      isMounted: () => {
        if(state[id]) return state[id].isMounted
        return false
      },
      onUnMounted: () => {
        clearTimeout(time)
        delete state[id]
        return {
          status: () => true,
          start: () => null,
          end: () => null,
          isMounted: () => false,
        }
      },
    }
  },
 
}

