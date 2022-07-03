import React,{useRef, useState, useEffect, useCallback} from 'react'
import PropTypes from 'prop-types'
import {CSearchBar} from './styles'
import styled, {Header} from '~/components'
import {redux} from 'lib'

const {
  InputContainer, IconLeft, Input, ClearContainer, IconRight, Loading
} = CSearchBar

function SearchBar({serviceSearch, ishome, state})
{
  const ref = useRef(null)

  const [text, onChangeText] = useState('')

  const [load, setLoad] = useState(true)

  const [focus, setFocus] = useState(true)

  const onFocus = useCallback( () => setFocus(true),[])

  const onBlur = useCallback( () => setFocus(false),[])
  
  const onClear = useCallback( () => {
    onChangeText('')
    ref.current.focus()
  },[])

  const onSearch = useCallback( async function (text){

    if(!serviceSearch.isMounted()) return
    
    setLoad(false)
    
    redux.push('search', text === ''
      ? {
          text,
          ...state
        }
      : await serviceSearch.getAllByText(text)
    )

    setLoad(true)

  },[state])



  useEffect(() => {

    var time = setTimeout(() => onSearch(text), 1000)

    return () => clearTimeout(time)
  },[text])

  return(
    <Header.Container style={ishome?{height: 60} :{}}>
      <InputContainer ishome={ishome}>
        <IconLeft />
        <Input
          ref={ref}
          value={text}
          onChangeText={onChangeText}
          focus={focus}
          onFocus={onFocus}
          onBlur={onBlur}
          />
        <ClearContainer
          onPress={onClear} 
          active={text!==''}
          >
          <IconRight load={!load} />
          <Loading load={load} />
        </ClearContainer>
      </InputContainer>
      <Header.Buttoms 
        style={{height: ishome? 53 : 83}}
        right1Action={null} 
        right2Action={null}
        />
    </Header.Container>
  )
}

SearchBar.propTypes = {
  ishome: PropTypes.bool,
  state: PropTypes.object.isRequired,
}

export default styled(SearchBar)
