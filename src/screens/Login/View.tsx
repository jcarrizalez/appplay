import React from 'react'
import PropTypes from 'prop-types'
import {Header} from '~/components'
import {CLogin} from './styles'

const {
  Container, Keyboard, Top, ZoneA, ZoneB, 
  Logo, Input, ZoneC,
  SendButton, Wave, Loading, Text, Visibility, Register,
  RegisterText, RegisterLink, VisibilityIcon, InputZone
} = CLogin

const View = ({s, onState, onCloseKeyboard, onLogin}) => (
  <Container>
    <Keyboard>
      <Top>
        <Header.Buttoms
          right2Action={null}
          right1Action={null}
         />
      </Top>
      <ZoneA onPress={onCloseKeyboard}>
        <Logo />
      </ZoneA>
      <ZoneB>
        <Input
          value={s.username} 
          placeholder="Email or phone number"
          onChangeText={text => onState(`username`, text)}
          keyboardType="email-address"
          autoFocus={true}
          showSoftInputOnFocus={true}
          error={s.errorUsername}
        />
        <InputZone>
          <Input
            value={s.password} 
            placeholder="Password"
            onChangeText={text => onState(`password`, text)}
            secureTextEntry={s.visibility}
            error={s.errorPassword}
          />
          <Visibility onPress={() => onState(`visibility`, !s.visibility)}>
            <VisibilityIcon active={s.visibility}/>
          </Visibility>
        </InputZone>
      <ZoneC onPress={onCloseKeyboard}>
        <SendButton onPress={onLogin} error={s.errorAll}>
          <Wave>
            <Text error={s.errorAll} />
          </Wave>
        </SendButton>
        <Register>
          <RegisterText /><RegisterLink />
        </Register>
      </ZoneC>
      </ZoneB>
    </Keyboard>
  </Container>
)

View.propTypes = {
  s: PropTypes.object.isRequired,
  onState: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
  onCloseKeyboard: PropTypes.func.isRequired,
}

export default View