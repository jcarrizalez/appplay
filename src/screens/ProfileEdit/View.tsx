import React from 'react'
import PropTypes from 'prop-types'
import {Header} from '~/components'
import {Profile} from './styles'

const {
  Container, Keyboard, Top, Touch, ZoneA, ZoneB, 
  Inputs, PickerView, DropDownPicker, ViewAvatars, 
  ViewLogo, BorderLogo, Logo, Edit, Avatars, Input,
  SendButton, Wave, Loading, Text
} = Profile

const View = ({s, active,distinct, onSave, onState, onCloseKeyboard, avatars, gender, genders, class_, classs, setGender, setClass_, old}) => (
  <Container>
    <Keyboard>
      <Top>
        <Header.Buttoms
          right2Action={null}
          right1Action={null}
         />
      </Top>
      <Touch onPress={onCloseKeyboard}>
        <ZoneA>
        <Touch onPress={onCloseKeyboard}>
          <ViewLogo>
            <BorderLogo>
              <Logo data={s}/>
            </BorderLogo>
            <Edit
              onPress={() => onState('avatars_open',!s.openAvatars)} 
              off={s.openAvatars}
              border
              />
          </ViewLogo>
        </Touch>
        <ViewAvatars open={s.openAvatars}>
          <Avatars 
            data={avatars
              ? avatars.filter(item => item.image!==s.image) 
              : []
            } 
            onPress={item => onState('avatars_item',item)}
            />
          </ViewAvatars>
        </ZoneA>
      </Touch>
      <ZoneB>
        <Inputs>
          <Touch onPress={onCloseKeyboard}>
            <PickerView style={{ 
                zIndex: s.openGender? 10 : 0
              }}>
              <DropDownPicker
                name='Genero'
                open={s.openGender}
                value={gender}
                items={genders??[]}
                setOpen={ bool => onState('gender_open',bool)}
                setValue={setGender}
                onSelectItem={ item => onState('gender_item',item)}
              />
            </PickerView>
          </Touch>
          <Touch onPress={onCloseKeyboard}>
            <PickerView style={{ 
                zIndex: s.openClass? 10 : 0, 
                display: !s.openGender? 'flex' : 'flex'
              }}>
              <DropDownPicker
                name='Clasificacion'
                open={s.openClass_}
                value={class_}
                items={classs??[]}
                setOpen={ bool => classs?
                  onState('class_open',bool) 
                  : null
                }
                setValue={setClass_}
                onSelectItem={ item => onState('class_item',item)}
                //setItems={setItems2}
                //schema={items2}
                />
            </PickerView>
          </Touch>
          {s.openClass_
            ? null
            : <>
                <Input
                  value={s.name} 
                  placeholder="Nombre"
                  onChangeText={text => onState('name', text)}
                  onFocus={() => onState('avatars_open',false)}
                  error={s.errorName}
                  />
                <SendButton 
                  distinct={distinct} 
                  onPress={()=> distinct
                    ? onSave() 
                    : null
                  }>
                  <Wave>
                    <Loading distinct={distinct} active={active}/>
                    <Text distinct={distinct} active={active} />
                  </Wave>
                </SendButton>
              </>
          }
        </Inputs>
      </ZoneB>
    </Keyboard>
  </Container>
)

View.propTypes = {
  s: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired,
}

export default View
