import React, {useRef, useState} from 'react'
import {Container, Section, Footer} from './styles'
import {withTheme} from 'styled-components/native'

function SliderIntro({theme, onAction})
{
  const ref = useRef(null)

  const [active, setActive] = useState(0)
  
  //const [isFin, setIfin] = useState(false)

  const fin = (theme.intro.length-1)

  const isFin = active===fin

  //if(!isFin && active===fin){
  //  setIfin(true);
  //}

  return (
    <Container>
      <Section.Container ref={ref} onPageSelected={e=>setActive(e.nativeEvent.position)}>
        {theme.intro.map(({image, title, description}, key)=>(
          <Section.Item key={key}>
            <Section.Background image={image}/>
            <Section.Gradient/>
            <Section.Footer>
              <Section.Title>{title}</Section.Title>
              <Section.Description>{description}</Section.Description>
            </Section.Footer>
          </Section.Item>
        ))}
      </Section.Container>

      <Footer.Container>
        <Footer.Points>
          {theme.intro.map((item, key)=> <Footer.Point key={key} active={(active===key)} />)}
        </Footer.Points>
        <Footer.Zone>
          <Footer.Touch
            onPress={()=> isFin
              ? onAction('Login')
              //? onAction('Sinup')
              //? onAction(null)
              : ref.current.setPage(active + 1)
            }>
            <Footer.Buttom >
              <Footer.Text>{isFin?"Finalizar":"Siguiente"}</Footer.Text>
            </Footer.Buttom>
          </Footer.Touch>
        </Footer.Zone>
      </Footer.Container>
    </Container>
  )
}

export default withTheme(SliderIntro)