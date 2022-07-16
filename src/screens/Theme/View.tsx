import React from 'react'
import PropTypes from 'prop-types'
import {Header} from '~/components'
import {Styles} from './styles'
import {redux} from 'lib'
const {
  Container, Top, ZoneA, ZoneB, Logo, ZoneC,
  Button, Wave, Loading, Text, Footer
} = Styles

const View = ({theme}) => (
  <Container>
      <Top>
        <Header.Buttoms
          right2Action={null}
          right1Action={null}
         />
      </Top>
      <ZoneA >
        <Logo />
        <Text name='Selecciona un Tema' />
      </ZoneA>
      <ZoneB>
        <Button onPress={() => redux.push('theme', 'dark')}>
          <Wave>
            <Text name='Dark' />
          </Wave>
        </Button>
        <Button onPress={() => redux.push('theme', 'company')}>
          <Wave>
            <Text name='Qubit' />
          </Wave>
        </Button>
        <Button onPress={() => redux.push('theme', 'light')}>
          <Wave>
            <Text name='Light' />
          </Wave>
        </Button>
      <ZoneC>
        <Footer>
          <Text name={theme.company.url_name} />
        </Footer>
      </ZoneC>
      </ZoneB>
  </Container>
)

View.propTypes = {
  theme: PropTypes.object.isRequired,
}

export default View