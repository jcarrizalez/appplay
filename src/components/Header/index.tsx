import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {Header, HContainer} from './styles'
import fn, {load} from './functions'
import {withTheme} from 'styled-components/native'

const Container = ({line = true, style = {}, children}) => <HContainer style={style} line={line}>{children}</HContainer>
Container.propTypes = {
  line: PropTypes.bool,
}


const Title = ({title = ``}) => (
  <Header.Container>
    <Header.Left />
    <Header.Center>
      <Header.Text title={title} />
    </Header.Center>
    <Header.Right />
  </Header.Container>
)
Title.propTypes = {
  title: PropTypes.string,
}

/**
 * USO
 * 
 * <Header.Buttoms
	    //leftAction='menu'
	    //leftOnPress={() => navigator(`toggleDrawer`, {})}
	    //right1Action='search'
	    //right1OnPress={() => navigator(`SearchModal`, {})}
	    //right2Action='cast'
	    //right2OnPress={() => navigator(`GoogleCast`, {})}
    	/>
 */
function Buttoms({
	style = {},
	leftAction = 'back', leftOnPress = null,
	right1Action = 'search', right1OnPress = null,
	right2Action = 'cast', right2OnPress = null,
})
{
	var menu, back, search, cast, edit_on, edit_off

	var [leftFunction] 		= useState(typeof leftOnPress === 'function')
	var [right1Function] 	= useState(typeof right1OnPress === 'function')
	var [right2Function] 	= useState(typeof right2OnPress === 'function')

	if(typeof leftAction === 'string'){

		switch(leftAction){
			case 'menu':
				menu = true
				if(!leftFunction) leftOnPress = fn.toggleDrawer
				break
			case 'back':
				back = true
				if(!leftFunction) leftOnPress = fn.goBack
				break
		}
	}

	if(typeof right1Action === 'string'){

		switch(right1Action){
			case 'search_home':
			case 'search':
				search = true
				if(!right1Function) right1OnPress = () => fn.search( right1Action === 'search_home' )
				break
			case 'edit_on':
				edit_on = true
				break
			case 'edit_off':
				edit_off = true
				break
			case null:
				right1cast = false
				right1OnPress = null
				break
		}
	}

	if(typeof right2Action === 'string'){

		switch(right2Action){
			case 'cast':
				cast = true
				if(!right2Function) right2OnPress = fn.googleCast
				break
			case null:
				right2cast = false
				right2OnPress = null
				break
		}
	}

	/*
 left={{action:'menu'}}
        right1={{action:'search'}}
        right2={{action:'cast'}}
        //onLeft={() => navigator(`toggleDrawer`, {})}
        //onRight={() => navigator(`SearchModal`, {})}
        //onCast={() => navigator(`GoogleCast`, {})}	
		*/
	return (
	  <Header.Container style={style}>
	    <Header.Left>
	    	{menu
	    		? <Header.BtMenu onPress={leftOnPress}/>
	    		: null
	    	}
	    	{back
	    		? <Header.BtBack onPress={leftOnPress}/>
	    		: null
	    	}

	    </Header.Left>
	    <Header.Center/>
	    <Header.Right>
	    	{cast
	    		? <Header.BtCast onPress={right2OnPress}/>
	    		: null
	    	}
	      	{search
	    		? <Header.BtSearch onPress={right1OnPress}/>
	    		: null
	    	}
	    	{edit_on
	    		? <Header.BtEdit onPress={right1OnPress}/>
	    		: null
	    	}
	    	{edit_off
	    		? <Header.BtEdit onPress={right1OnPress} off={true}/>
	    		: null
	    	}
	    </Header.Right>
	  </Header.Container>
	)
}
/*
Buttoms.propTypes = {
  style: PropTypes.object,
  leftAction: PropTypes.styring,
  leftOnPress: PropTypes.func,
  right1Action: PropTypes.styring,
  right1OnPress: PropTypes.func,
  right2Action: PropTypes.styring,
  right2OnPress: PropTypes.func,
}
*/

export default {
  Title:withTheme(p=><Title {...p}/>),
  Buttoms:withTheme(p=><Buttoms {...p}/>),
  Container:withTheme(p=><Container {...p}/>),
}