import React, {useState, useEffect} from 'react'
import { View, Image as IMG } from 'react-native'

export async function LoadImg(uri){

	let cache = await IMG.queryCache([uri])

	if(!cache) await IMG.prefetch(uri)
}

function Image(props)
{	

	const [load, setLoad] = useState(true)

	const [prop] = useState(props)

	const [uri] = useState(prop.source.uri??{})
	/*
	useEffect(() =>
	{
		if(load) return
		async function inCache(uri){

			let cache = await IMG.queryCache([uri])

			if(!cache){
				await IMG.prefetch(uri)
			}
			setLoad(true)
		}
		//inCache(uri)

		return () => {
		}
	},[])
*/
	if(!load) return (
		<View key={`v-${uri}`} {...props} 
			style={[
				props.style??{},
				{backgroundColor:'gray'}
			]}/>)
	
	return (
		<IMG key={`i-${uri}`} {...props}
		/*
			source={{
				...props.source,
				cache: 'only-if-cached'
			}}
		*/
			style={[
				props.style??{},
				{
					//backgroundColor:'gray'
				}
			]}
			//onLoadEnd={e => console.log('onLoadEnd')}
            //onError={error => console.log('onError')}
            //onLoadStart={e => console.log('onLoadStart')}
    />)
}

export default Image