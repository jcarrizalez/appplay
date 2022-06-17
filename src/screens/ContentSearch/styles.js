import styled from 'styled-components/native'
import { Grid, Image } from '~/components'

export const CSearch =
{
  Container: styled.View`
    flex:1;
    padding-top:0;
    background-color: ${p=>p.theme.color.backgroundPrimary};
  `,
  Progress: styled.View`
   width: ${({load}) => load || 0}%;
   height:1px;
   backgroundColor: ${p=>p.theme.color.orange};
  `
}

export const Data = styled(Grid).attrs({
  cardWidth:120,
  cardHeight:180,
  padding:5,
  margin:5,
  use:'window',
})`
  flex:1;
  background-color: ${p=>p.theme.color.backgroundPrimary};
`

export const Card = {
  TouchCover: styled.TouchableOpacity.attrs({
    activeOpacity:0.7
  })`
  `,
  Cover: styled(Image).attrs(({item}) =>({
    resizeMode: 'stretch',
    source:{
      uri:item.portrait,
      //cache: 'reload'
    } 
  }))`
    border-radius: 4px;
  `
}
