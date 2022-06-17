import styled from 'styled-components/native'
import Buttoms from '~/components/Buttom'

export const HContainer = styled.View`
  height: 85px;
  top: 0;
  z-index:1;  
  width: 100%;
  border-bottom-width: 0.3px;
  border-color: ${p => p.line? p.theme.color.lightGrey : `transparent`};
`

export const Header = {
  Container: styled.View`
    height: 85px;
    width: 100%;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    position: absolute;
    top: 0;
  `,
  Left: styled.View`
    width: 50px;
    height: 100%;
  `,
  Right: styled.View`
    width: 105px;
    height: 100%;
  `,
  Center: styled.View`
    flex:1;
    height: 100%;
    align-items: center;
    justify-content: flex-end;
    padding: 0;
    padding-bottom:10px;
  `,
  Text: styled.Text.attrs(({title}) =>({
     numberOfLines:1,
    children: title
  }))`
    font-size:20px;
    color: ${p=>p.theme.color.white};
  `,
  BtBack: styled(Buttoms.Back)`
    position: absolute;
    left: 5px;
    bottom: 2px;
  `,
  BtMenu: styled(Buttoms.Menu)`
    position: absolute;
    left: 5px;
    bottom: 2px;
  `,
  BtCast: styled(Buttoms.Cast)`
    position: absolute;
    right:57px;
    bottom: 3px;
  `,
  BtSearch: styled(Buttoms.Search)`
    position: absolute;
    right:10px;
    bottom: 3px;
  `,
  BtEdit: styled(Buttoms.Edit)`
    position: absolute;
    right:10px;
    bottom: 3px;
  `,
}
