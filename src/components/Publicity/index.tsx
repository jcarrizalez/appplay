import React, { useRef, useEffect, useState, useCallback } from 'react'

import {
  Platform,
  View, //nuevo
  Text,
  Image,
  ImageBackground, //nuevo
  Dimensions,
  Animated, 
  ActivityIndicator, 
  TouchableWithoutFeedback,
  ScrollView
} from "react-native"
import {withTheme} from 'styled-components/native'
import {redux, contents, navigator} from 'services'
import {Banner1, Banner2, Banner3, Banner4} from './styles'


function Marketing({position, theme})
{
	const {username} = theme.session?.info_user

	const history = theme.session?.history_login? true : false

	const [content, setInfoContent ] = useState({})

	useEffect(function(){
		
		if(position === 16){

			let data = redux.get('contents')

			var randomProperty = function (obj) {
			    var keys = Object.keys(data);
			    return data[keys[ keys.length * Math.random() << 0]];
			}
			setInfoContent(randomProperty())
		}

	},[position])

	switch(position){
		case 3:
			return (!username && !history) ? <B1 /> : null
		case 7:
			return !username ?<B2 /> : null
		case 11:
			return (!username && !history) ?<B3 /> : null
		case 16:
			return <B4 content={content}/>
		default:
			return null
	}
}

const B1 = () => (
	<Banner1.Container>
		<Banner1.Gradient>
			<Banner1.Background/>
			<Banner1.Li1 />
			<Banner1.Li2 />
			<Banner1.Li3 />
			<Banner1.Li4 />
			<Banner1.Buttom>
				<Banner1.Text/ >
			</Banner1.Buttom>
		</Banner1.Gradient>
	</Banner1.Container>
)

const B2 = () => (
	<Banner2.Container>
		<Banner2.Li1/>
		<Banner2.Buttom onPress={()=> navigator('Login',{ismenu:true})}>
			<Banner2.Text />
		</Banner2.Buttom>
		<Banner2.Li2/>
	</Banner2.Container>
)

const B3 = () => (
	<Banner3.Container>
		<Banner3.Buttom>
			<Banner3.Text/ >
		</Banner3.Buttom>
	</Banner3.Container>
)

const B4 = ({content}) => {

	return(
		<Banner4.Container onPress={()=>navigator('ContentDetail', content)}>
			<Banner4.Gradient>
				<Banner4.Background content={content}/>
			</Banner4.Gradient>
		</Banner4.Container>
	)
}

function Menu({position}){

	return null
}


export default {
	Menu:withTheme(p=><Menu {...p}/>),
	Content:withTheme(p=><Marketing {...p} position={3}/>),
	Channel:withTheme(p=><Marketing {...p} position={3}/>),
	Marketing:withTheme(p=><Marketing {...p}/>),
}