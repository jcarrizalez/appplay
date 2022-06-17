import {HeaderStyleInterpolators, TransitionPresets} from '@react-navigation/stack';


const modalIos = TransitionPresets.ModalPresentationIOS
const headerStyleInterpolator = HeaderStyleInterpolators.forUIKit

function drawerContent(props)
{
  if(
    typeof props !== 'object' ||
    typeof props.state !== 'object' ||
    !Array.isArray(props.state.routeNames) ||
    !Array.isArray(props.state.routes)
  ) return props

  return props

	return {
		...props,
		state: {
		  ...props.state,
		  routeNames: props.state.routeNames.filter(routeName =>  routeName !== 'ProfileList'),
		  routes: props.state.routes.filter(route => route.name !== 'ProfileList'),
		},
	}
}

const drawerOptions = {
  headerShown: false,
  drawerType:  'front',
  drawerPosition: 'left',
  drawerStyle: {
    //backgroundColor: 'transparent',
    width: 300,
  },
} 

const screenOptions = { 
  headerMode: 'screen',
  headerShown: false,
  headerTitleAlign: 'center',
  headerTintColor: 'white',
  headerTitleStyle: {
      fontWeight: 'bold',
  },
  headerStyle: {
    backgroundColor: 'transparent',
    opacity:0.1
  },
}

export default {
	drawerContent,
	drawerOptions,
	screenOptions,
  modalIos,
  headerStyleInterpolator,
}