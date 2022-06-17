import React,{useEffect} from 'react'
import { ToastProvider, useToast } from 'react-native-toast-notifications'
import {redux} from 'services'

function Toast()
{
  const toast = useToast();

  useEffect(() =>
  {
    const unsubscribe = redux.subscribe( () =>
    {
      if(!redux.is('toast')) return

      let {message, update, id} = redux.get('toast')

      //si esto ocurre es porque estoy devolviendo el id
      if(message > 0) return
      
      if(
        typeof toast?.show !== 'function' ||
        typeof toast?.update !== 'function'
      ) return

      if(id) return toast?.update(id, message)
        
      let idToast = toast?.show(message)

      if(update) redux?.push('toast',{message:idToast})
    })

    return () => unsubscribe()

  },[toast])

  return null
}

const Notifications = ({children}) =>(
  <ToastProvider>
    {children}
    <Toast style={{zIndex:1}}/>
  </ToastProvider>
)

export default Notifications