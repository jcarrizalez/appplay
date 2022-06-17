import {api, redux, navigator, toast} from 'services'
import mapperPlay from '~/mappers/play'
import mapperCast from '~/mappers/cast'

export default async (uuid, title, iscast = false) =>
{
   const loading = iscast? false : true

   if(!uuid || !title) return

   const {username} = redux.get(`info_user`)

   if(!username){
      navigator(`Login`,{})
      return
   }
   
   if(!username) return toast(`debes iniciar sesión`)

   let response = await api.get(loading, `/content/${uuid}/play`)
   
   if(!response) return toast(`${title} no dosponible`)

   return iscast
      ? mapperCast(response)
      : mapperPlay(response)
}