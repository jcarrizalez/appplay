export animations from './animations'
export configNavigatation from './navigator'

import {information} from '../companies/qubit'
import {logo as logo_} from '../companies/qubit'
import {intro as intro_} from '../companies/qubit'
import {colors as colors_} from '../companies/qubit'

const dark = {
  statusBar:'light',
  white: 'white',
  black: 'black',
  orange: '#BA6602',
  backgroundPrimary: '#212121',   // color de fondo
  backgroundSecondary: '#0556c4',
  backgroundInput: '#333',
  colorInput: 'grey',
  playerBlack: 'black',
  darkGrey: '#333',
  lightGrey: 'grey',
  red: 'red',
}

const light = {
  statusBar:'dark',
  white: 'black',
  black: 'white',
  orange: 'orange',
  backgroundPrimary: '#E5E8E8',
  backgroundSecondary: 'grey',
  backgroundInput: '#CED0D0',
  colorInput: 'grey',
  playerBlack: 'white',
  darkGrey: '#2C2C2C',
  lightGrey: 'grey',
  red: 'red',
}

const qubit = {
  statusBar:'light',
  white: 'white',
  black: 'black',
  orange: 'orange',
  backgroundPrimary: '#020a38',
  backgroundSecondary: '#0556c4',
  backgroundInput: '#333',
  colorInput: 'grey',
  playerBlack: 'black',
  darkGrey: '#333',
  lightGrey: 'grey',
  red: 'red',
}


var current_color

export default function config(color)
{	

	if(color === 'dark'){
		current_color = dark
	}
	else if(color === 'light'){
		current_color = light
	}
	else{
		current_color = colors_
		current_color = qubit
	}

	return {
		company: information,
		logo: logo_,
		intro: intro_,
		colors: current_color,
		color: current_color,
	}
}