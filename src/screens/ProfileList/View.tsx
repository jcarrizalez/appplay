import React from 'react'
import {Header, Icon, Buttom } from '~/components'
    
import styles, {Add, Profiles, Container, Profile, Avatar, Name, Area, Scroll, Title } from './styles';

function View({s, onEdit, onSelect, onEditView})
{
  var opacity = {opacity: s.edit?0.4:1}

  function Item({profile}){

    if(!profile) return null

    if(profile.add){
      return s.edit
      ? <Profile onPress={() => onEdit(profile)}>
          <Add><Icon name='person-add-alt-1' size={40}/></Add>
          <Name>Agregar</Name>
        </Profile>
      : null
    }

    return(
      <Profile onPress={() => 
        s.edit
          ? onEdit(profile)
          : onSelect(profile.id, s.profile_id)
        }>
        <Avatar 
            style={opacity}
            source={{uri: profile.image}}
          />
        <Name style={opacity}>{profile.name}</Name>
        {
          s.edit
          ? <Buttom.Edit 
              onPress={() => onEdit(profile)} 
              style={styles.edit} 
              border
              />
          : null
        }
      </Profile>
    )
  } 

  //const add = (s.profiles.length<4) ?{add:true} : null

  const Section = ({profile1, profile2}) => !profile1? null:
    <Area>
      <Item profile={profile1} />
      <Item profile={profile2} />
    </Area>

  var add = false

  return (
    <Profiles.Container>
      <Profiles.Top>
        <Header.Buttoms
          right2Action={null}
          right1Action={s.old_edit
            ? null 
            : (s.edit? 'edit_off' : 'edit_on')
          }
          right1OnPress={
            s.old_edit
            ? null : 
            () => onEditView(!s.edit)
          }
         />
       </Profiles.Top>
     
      <Profiles.Title edit={s.edit} username={s.username} />
      <Scroll>
         {s.profiles
          ? [0,2,4,6].map((item, key) => {

            let profile1 = s.profiles[item]??null

            let profile2 = s.profiles[item + 1]??null

            if(!add && !profile1){
              add = true
              profile1 = {add, image:s.profiles[0].image}
            }
            else if(!add && !profile2){
              add = true
              profile2 = {add}
            }

            return <Section key={key} profile1={profile1} profile2={profile2}/>
          })
          : null
        }

       <Profiles.Loading loading={!s.username?true:false}/>
       </Scroll>
    </Profiles.Container>
  )
}

export default View