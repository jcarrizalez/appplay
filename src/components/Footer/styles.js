import styled from 'styled-components/native'

export const Text = styled.Text.attrs(p => ({
    numberOfLines: 1,
    children:p.theme.company.url_name,
  }))`
    color: white;
    textAlign: center;
    marginBottom: 40px;
    background-color: transparent;
  `
