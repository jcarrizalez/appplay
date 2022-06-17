import PropTypes from 'prop-types'
import {navigator} from 'services'

var state_load_header

/**
 * Este metodo controla la ejecucion async, para no ser ejecutar 2 veces
 * o esperar que la anterior de este screen termine, adicional que este montado
 */
export const load = {
	status: () => state_load_header,
	start: () => state_load_header = true,
	end: () => state_load_header = false,
}

function onNavigator<Type>(route, params = {})
{
   if(load.status()) return
	load.start()

   navigator(route, params)
   setTimeout(() => load.end(), 1000)
}

export default {
	goBack:() => onNavigator(`goBack`), 
	googleCast:() => onNavigator(`GoogleCast`),
	toggleDrawer: () => onNavigator(`toggleDrawer`),
	search:ishome => onNavigator(ishome
		? `SearchMarketing`
		: `Search`
	, {ishome}), 
}
