import {api, redux, navigator, toast} from 'lib'
import mapperPlay from '~/mappers/play'
import mapperCast from '~/mappers/cast'

export default async (uuid, title, isCast = false) =>
{
   const loading = isCast? false : true

   if(!uuid || !title) return

   const {username} = redux.get(`info_user`)

   if(!username){
      navigator(`Login`,{})
      return
   }
   
   if(!username) return toast(`debes iniciar sesión`)

   let response = await api.get(loading, `/content/${uuid}/play`)
   
   if(!response) return toast(`${title} no dosponible`)

   response = isCast ? mapperCast(response) : mapperPlay(response)
   response.isCast = isCast

   return response
}