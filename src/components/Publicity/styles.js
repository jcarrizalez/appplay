import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Banner1 = {
  Container: styled.View`
    height: 180px;
    width: 100%;
    padding: 0 10px;
    margin: 10px 0;
  `,
  Gradient: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 1, y: 1 },
    locations:[0, 0.90],
    colors:[p.theme.color.backgroundSecondary, 'transparent'],
  }))`
    height: 100%;
    border-radius: 5px;
    border-color: white;
    border-width: 0.2px;
    align-items: flex-start;
    justify-content: flex-start;
  `,
  Background: styled.Image.attrs(p=>({
    resizeMode: 'cover',
    source:{uri: p.theme.company.backgroundMenu}
  }))`
    width: 100%;
    height: 100%;
    opacity: 0.3;
    position: absolute;
    border-radius: 5px;
  `,

  View: styled.ImageBackground.attrs(p =>({

  }))`
    width: 100%;
    height: 100%;
    background-color: blue;
    
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
  `,
  //backgroundPublicityBanner1
  Li1: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `¿Por qué suscribirme a Qubit?`
  }))`
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0 10px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Li2: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `∙ Catálogo seleccionado por expertos.`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Li3: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `∙ Primeros 7 días gratis, luego ARS$ 499 finales por mes.`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Li4: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `∙ Cancelás cuando quieras desde tu cuenta.`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Buttom: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    alignSelf: center;
    width: 300px;
    height: 55px;
    background-color: orange;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    border-width: 1px;
    border-color: grey;
    margin-top: 20px;
  `,
  Text: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `Comenzar 7 días gratis`
  }))`
    font-size:22px;
    color: ${p=>p.theme.color.white};
  `,
}

export const Banner2 = {
  Container: styled.View`
    width: 100%;
    margin: 0px 0;
    align-items: center;
    justify-content: center;
    height: 120px;
  `,

  Li1: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `Estas registrado?`
  }))`
    font-size: 16px;
    font-weight: bold;
    color: ${p=>p.theme.color.white};
  `,
  Li2: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `disfruta de todos los contendidos si eres usuario`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Buttom: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    alignSelf: center;
    width: 200px;
    height: 50px;
    background-color: orange;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    border-width: 1px;
    border-color: grey;
    margin: 10px 0;
  `,
  Text: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `Iniciar Sesión`
  }))`
    font-size:22px;
    color: ${p=>p.theme.color.white};
  `,
}

export const Banner3 = {
  Container: styled.View`
    height: 100px;
    width: 100%;
    margin: 0px 0;
    align-items: center;
    justify-content: center;
  `,
  Buttom: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    alignSelf: center;
    width: 300px;
    height: 55px;
    background-color: orange;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    border-width: 1px;
    border-color: grey;
    margin: 10px 0;
  `,
  Text: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `REGISTRARME AHORA`
  }))`
    font-size:22px;
    color: ${p=>p.theme.color.white};
  `,
}

export const Banner4 = {
  Container: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    height: 180px;
    width: 100%;
    padding: 0 10px;
    margin: 10px 0;
    align-items: center;
    justify-content: center;
  `,
  Gradient: styled(LinearGradient).attrs(p=>({
    start:{ x: 0, y: 0 },
    end:{ x: 1, y: 1 },
    locations:[0, 0.90],
    colors:['transparent', 'transparent'],
  }))`
    height: 100%;
    width: 270px;
    border-radius: 5px;
    border-color: white;
    border-width: 0.2px;
    
  `,
  Background: styled.Image.attrs(p=>({
    resizeMode: 'contain',
    source:{uri: p.content.landscape}
  }))`
    width: 100%;
    height: 100%;
    opacity: 0.9;
    position: absolute;
    border-radius: 5px;
  `,

  View: styled.ImageBackground.attrs(p =>({

  }))`
    width: 100%;
    height: 100%;
    background-color: blue;
    
    align-items: flex-start;
    justify-content: flex-start;
    padding: 10px;
  `,
  //backgroundPublicityBanner1
  Li1: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `¿Por qué suscribirme a Qubit?`
  }))`
    font-size: 16px;
    font-weight: bold;
    padding: 10px 0 10px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Li2: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `∙ Catálogo seleccionado por expertos.`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Li3: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `∙ Primeros 7 días gratis, luego ARS$ 499 finales por mes.`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Li4: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `∙ Cancelás cuando quieras desde tu cuenta.`
  }))`
    font-size:12px;
    padding: 0 0 1px 10px;
    color: ${p=>p.theme.color.white};
  `,
  Buttom: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
    alignSelf: center;
    width: 300px;
    height: 55px;
    background-color: orange;
    align-items: center;
    justify-content: center;
    border-radius: 50px;
    border-width: 1px;
    border-color: grey;
    margin-top: 20px;
  `,
  Text: styled.Text.attrs(p =>({
     numberOfLines:1,
    children: `Comenzar 7 días gratis`
  }))`
    font-size:22px;
    color: ${p=>p.theme.color.white};
  `,
}
