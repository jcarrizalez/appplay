import React, {useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {redux} from 'services'
import {Share, Linking} from 'react-native'

import Item from './Items'
import {Menu, Avatar} from './styles'

import fn from './functions'

import {withTheme} from 'styled-components/native'

const {Container, Header, Footer, Hr, ViewA, ViewB, ScrollView } = Menu
const {Gradient, Background, Touch, Image, Name, Change, Icon} = Avatar
const {Dad, Children} = Item

const account = 'account'
const explore = 'explore'
const help = 'help'

function DrawerMenu({theme})
{
  const info = theme.session.info_user
  
  const [load, setLoad] = useState(true)

  const [dropdown, setDropdown] = useState(null)

  const [genres] = useState(redux.get('genres'))

  const onDropdown = useCallback( name => setDropdown((name !== dropdown)? name : null),
  [dropdown])
  
  const onProfiles = useCallback(() => fn.onProfiles(info),
  [info])

  const onProfilesEdit = useCallback(() => fn.onProfiles(info, true),
  [info])

  const onShare = useCallback(() => fn.onShare(Share),
  [])

  const viewA = (dropdown===account)
  const viewB = (dropdown===explore)
  const viewC = (dropdown===help)
  const session = info?.username??false


  return (
    <Container>
      <Header>
      <Gradient>
        <Background/>
          <Touch onPress={(onProfiles)}>
            {session
              ? <Image info={info}/>
              : null
            }
          </Touch>
          <Name onPress={onProfiles} info={info} />
          <Change onPress={onProfiles}>
            <Icon info={info} />
          </Change>
      </Gradient>
      </Header>
        <ScrollView>
        {session
          ? <>
              <Dad title='Mi cuenta' icon='settings' active={viewA} onPress={() => onDropdown(account)}/>
                <ViewA dropdown={viewA}>
                  <Children title='Mis datos' onPress={() => Linking.openURL('https://aboutreact.com/')}/>
                  <Children title='Suscripcion' onPress={() => Linking.openURL('https://aboutreact.com/')}/>
                  <Children title='Perfiles' onPress={onProfilesEdit}/>
                </ViewA>
              <Dad title='Mi lista' icon='label-outline' onPress={fn.onMyList} solid/>
              <Dad title='Continuar viendo' icon='slow-motion-video' onPress={fn.onContinueWatching} solid/>
              <Dad title='Novedades' icon='new-releases' onPress={fn.onNovedades} solid/>
              <Dad title='Invitar a tus amigos' icon='people-alt' onPress={onShare} solid/>
            </>
          : <>
              <Dad title='Iniciar sesion' icon='login' onPress={fn.onLogin} solid/>
              <Dad title='Novedades' icon='new-releases' onPress={fn.onNovedades} solid/>
            </>
        }
        <Dad title='Generos' icon='play-circle-outline' active={viewB} onPress={() => onDropdown(explore)}/>
          <ViewB dropdown={viewB}>
            {genres?.map((item, key) => <Children key={key} title={item.name} onPress={() => fn.onContentSearchGenres(item)}/>)}
          </ViewB>
        <Dad title='Configuracion y ayuda' icon='settings' active={viewC} onPress={() => onDropdown(help)}/>
          <ViewA dropdown={viewC} height={125}>
            <Children title='Centro de ayuda' onPress={() => Linking.openURL(theme.company.url_help)}/>
            <Children title='Contactanos' onPress={() => Linking.openURL(theme.company.url_contact)}/>
            <Children title='Terminos y condiciones' onPress={() => Linking.openURL(theme.company.url_terms_and_conditions)}/>
            {/*
            */}
            <Children title='Color Dark' onPress={() => redux.push('theme', 'dark')}/>
            <Children title='Color Qubit' onPress={() => redux.push('theme', 'company')}/>
            <Children title='Color Light' onPress={() => redux.push('theme', 'light')}/>
          </ViewA>
        
        {session
          ? <>
              <Hr active={dropdown}/>
              <Item.Dad title='Cerrar sesion' icon='exit-to-app' onPress={fn.onLogout} solid/>
              <Footer active={!dropdown} />
            </>
          : null
        }
        </ScrollView>
      <Footer active={dropdown} />
    </Container>
  )

  return (
    <Container>
      <Header>
      <Gradient>
        <Background/>
          <Touch onPress={(onProfiles)}>
            {session
              ? <Image info={info}/>
              : null
            }
          </Touch>
          <Name onPress={onProfiles} info={info} />
          <Change onPress={onProfiles}>
            <Icon info={info} />
          </Change>
      </Gradient>
      </Header>
        {session
          ? <>
              <Item.Dad title='Mi cuenta' icon='settings' active={scrollViewA} onPress={() => onDropdown(account)}/>
                <ScrollViewA dropdown={scrollViewA}>
                  <Item.Children title='Mis datos' onPress={() => Linking.openURL('https://aboutreact.com/')}/>
                  <Item.Children title='Suscripcion' onPress={() => Linking.openURL('https://aboutreact.com/')}/>
                  <Item.Children title='Perfiles' onPress={onProfilesEdit}/>
                </ScrollViewA>
              <Item.Dad title='Mi lista' icon='label-outline' onPress={fn.onMyList} solid/>
              <Item.Dad title='Continuar viendo' icon='slow-motion-video' onPress={fn.onContinueWatching} solid/>
              <Item.Dad title='Novedades' icon='new-releases' onPress={fn.onNovedades} solid/>
              <Item.Dad title='Invitar a tus amigos' icon='people-alt' onPress={onShare} solid/>
            </>
          : <>
              <Item.Dad title='Iniciar sesion' icon='login' onPress={fn.onLogin} solid/>
              <Item.Dad title='Novedades' icon='new-releases' onPress={fn.onNovedades} solid/>
            </>
        }
        <Item.Dad title='Generos' icon='play-circle-outline' active={scrollViewB} onPress={() => onDropdown(explore)}/>
          <ScrollViewB dropdown={scrollViewB}>
            {genres?.map((item, key) => <Item.Children key={key} title={item.name} onPress={() => fn.onContentSearchGenres(item)}/>)}
          </ScrollViewB>
        <Item.Dad title='Configuracion y ayuda' icon='settings' active={scrollViewC} onPress={() => onDropdown(help)}/>
          <ScrollViewA dropdown={scrollViewC} height={125}>
            <Item.Children title='Centro de ayuda' onPress={() => Linking.openURL(theme.company.url_help)}/>
            <Item.Children title='Contactanos' onPress={() => Linking.openURL(theme.company.url_contact)}/>
            <Item.Children title='Terminos y condiciones' onPress={() => Linking.openURL(theme.company.url_terms_and_conditions)}/>
            {/*
            */}
            <Item.Children title='Color Dark' onPress={() => redux.push('theme', 'dark')}/>
            <Item.Children title='Color Qubit' onPress={() => redux.push('theme', 'company')}/>
            <Item.Children title='Color Light' onPress={() => redux.push('theme', 'light')}/>
          </ScrollViewA>
      
        {session
          ? <>
              <Hr />
              <Item.Dad title='Cerrar sesion' icon='exit-to-app' onPress={fn.onLogout} solid/>
            </>
          : null
        }

      <Footer active={scrollViewB} />
    </Container>
  )
}
DrawerMenu.propTypes = {
  //theme: PropTypes.string.isRequired
}

export default withTheme(DrawerMenu)